import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express();

// habilitamos el parse que habilita la lectura del req.body
app.use(express.json());

// habilitamos las variables de entorno
dotenv.config();

// conxion DB
conectarDB();

// Configuracion de Cors
const whitelist = [process.env.FRONTEND_URL]  // dominios permitidos
/*
  origin -> quien esta enviando el request
*/
const corsOptions = {  
  origin: function(origin, callback) {
    // console.log(origin)  // es la url del frontend
    if(whitelist.includes(origin)) {
      // si origin esta en la whitelist significa que la peqticion viene del forntend y puede acceder a la API
      // enviamos en el callback null al error y damos acceso con true
      callback(null, true)
    } else {
      // si origin no esta en la whitelist no tiene acceso a la API
      // enviamos en el callback el error
      callback(new Error('Error de Cors')) 
    }
  }
}

app.use(cors(corsOptions));


// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})