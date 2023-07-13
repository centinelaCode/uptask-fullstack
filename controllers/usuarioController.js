import bcrypt from 'bcrypt'

import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';



//* ==========> Registrar un  usuario (guardarlo en la db) <==========
const registrar = async (req, res) => {
   try {      
      const { email } = req.body;      

      // verificamos que el email no este registrado en la db 
      const existeUsuario = await Usuario.findOne({ email })
      if(existeUsuario)  {
         const error = new Error('Usuario ya registrado')         
         return res.status(400).json({ msg: error.message });
      }

      // si el email no esta registrado guardamos en la db
      const usuario = new Usuario(req.body);
      usuario.token = generarId(); //! se genera el token unico
      
      const nuevoUsuario = await usuario.save();
      res.json(nuevoUsuario);

      console.log(nuevoUsuario)
      
   } catch (error) {
      console.log(error) 
   }   
}



//* ==========> Autenticar usuario (iniciar sesion) <==========
const autenticar = async(req, res) => {
   const { email, password } = req.body;

   // Verificar si el usuario existe
   const usuario = await Usuario.findOne({email})
   if(!usuario) {
      const error = new Error('Usuario no está registrado')         
      return res.status(400).json({ msg: error.message });
   }

   // Verificar si el usuario confirmo su cuenta
   if(!usuario.confirmado) {
      const error = new Error('Tu cuenta no ha sido confirmada')         
      return res.status(403).json({ msg: error.message });
   }

   // Verificar si el password es correcto     
   if(await usuario.comprobarPassword(password)) {
      res.json({
         _id: usuario.id,
         nombre: usuario.nombre,
         email: usuario.email,
         token: generarJWT(usuario._id),
      })
   } else {
      const error = new Error('El password es incorrecto')         
      return res.status(403).json({ msg: error.message });
   }
}



//* ==========> Confirmar usuario (se envia token por la url) <==========
const confirmar = async(req, res) => {
   const { token } = req.params

   // verificamos si el token es valido
   const usuarioConfirmar = await Usuario.findOne({ token })   
   if(!usuarioConfirmar) {
      const error = new Error('Token Invalido')         
      return res.status(400).json({ msg: error.message });
   }

   // si token valido
   try {
      usuarioConfirmar.confirmado = true;
      usuarioConfirmar.token = '';
      await usuarioConfirmar.save();

      res.json({msg: 'Usuario Confirmado Correctamente' })      
   } catch (error) {
      console.log(error)
   }
   
}



//* ==========> OlvidePassword (se envia el email y se genera nuevo token) <==========
const olvidePassword = async(req, res) => {
   const { email } = req.body;

   // Verificar si el usuario existe
   const usuario = await Usuario.findOne({email})
   if(!usuario) {
      const error = new Error('Usuario no está registrado')         
      return res.status(400).json({ msg: error.message });
   }

   //* Si existe el usuario
   try {
      //* generamos un nuevo token
      usuario.token = generarId(); //! se genera un nuevo token
      await usuario.save();

      res.json({ msg: 'Hemos enviado un email con las instrucciones'})
      
   } catch (error) {
      console.log(error)
   }
}


//* ==========> OlvidePassword (se envia token via url)  <==========
const comprobarToken = async(req, res) => {
   const { token } = req.params;

   const tokenValido = await Usuario.findOne({ token });
   if(tokenValido) {      
      res.json({msg: 'Token Valido y el Usuario Existe'})
   } else {
      const error = new Error('Token Invalido')         
      return res.status(400).json({ msg: error.message });
   }
}


//* ==========> Nuevo Password (permite guardar el nuevo password)  <==========
const NuevoPassword = async(req, res) => {
   const { token } = req.params;
   const { password } = req.body;

   const usuario = await Usuario.findOne({ token });
   if(usuario) {      
      // rescribimos el password del usuario
      usuario.password = password;
      usuario.token = '';

      try {
         await usuario.save();
         res.json({ msg: 'El Password se Actualizo Correctamente' })         
      } catch (error) {
         console.log(error);   
      }
      
   } else {
      const error = new Error('Token Invalido')         
      return res.status(400).json({ msg: error.message });
   }



}

export {
   registrar,
   autenticar,
   confirmar,
   olvidePassword,
   comprobarToken,
   NuevoPassword,
}