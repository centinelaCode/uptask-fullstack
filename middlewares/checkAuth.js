import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';


const checkAuth = async(req, res, next) => {
   let token;

   // verificamos si hay un Bearer token en los headers
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
         // obtenemos el token(JWT)
         token = req.headers.authorization.split(' ')[1];
         
         // decodificamos el JWT
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // obtenemos la data del payload del JWT (omitimos por seguridad algunos campos)
         req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')

         // Usuario autenticado correctamente pasamos a perfil()
         return next();

      } catch (error) {
         return res.status(404).json({ msg: 'Hubo un error' })
      }
   }

   if(!token) {
      const error = new Error('Token NO valido!!')         
      return res.status(401).json({ msg: error.message });
   }

      next()
   }


export default checkAuth;