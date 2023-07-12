import express from 'express'
import dotenv from 'dotenv'

import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express()

// habilitamos las variables de entorno
dotenv.config();


// conxion DB
conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})