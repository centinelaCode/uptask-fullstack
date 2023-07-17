import express from 'express'
import dotenv from 'dotenv'

import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'

const app = express();
app.use(express.json());

// habilitamos las variables de entorno
dotenv.config();


// conxion DB
conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})