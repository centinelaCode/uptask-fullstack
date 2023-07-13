import Usuario from '../models/Usuario.js';



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
      const nuevoUsuario = await usuario.save();

      res.json(nuevoUsuario);

      console.log(nuevoUsuario)
      
   } catch (error) {
      console.log(error) 
   }   
}

export {
   registrar
}