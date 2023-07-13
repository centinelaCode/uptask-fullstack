import express from 'express'

import { 
   registrar,
   autenticar,
   confirmar,
   olvidePassword,
} from '../controllers/usuarioController.js'

const router = express.Router()


//* ===== Authenticación, Registro y Confirmación de Usuarios =======
router.post('/', registrar);                          //? Crea un nuevo usuario
router.post('/login', autenticar);                    //? login(iniciar sesion)
router.get('/confirmar/:token', confirmar)            //? confirmar la cuenta via token
router.post('/olvide-password', olvidePassword)       //? se envia email para restablecer password
router.get('/olvide-password/:token', comprobarToken) //? check token del que solicito restablecer password




export default router;