import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';



// registrar un usuario
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


const autenticar = async(req, res) => {
   const {email, password} = req.body;

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
}

export {
   registrar,
   autenticar,
}