import express from 'express'

import { registrar } from '../controllers/usuarioController.js'

const router = express.Router()


//* ===== Authenticación, Registro y Confirmación de Usuarios =======
router.post('/', registrar);   //? Crea un nuevo usuario




export default router;