import express from 'express'

import { 
   registrar,
   autenticar,
   confirmar,
} from '../controllers/usuarioController.js'

const router = express.Router()


//* ===== Authenticación, Registro y Confirmación de Usuarios =======
router.post('/', registrar);                 //? Crea un nuevo usuario
router.post('/login', autenticar);           //? login(iniciar sesion)
router.get('/confirmar/:token', confirmar)




export default router;