import express from 'express'

import { 
   registrar,
   autenticar,
   confirmar,
   olvidePassword,
   comprobarToken,
   NuevoPassword,
} from '../controllers/usuarioController.js'

const router = express.Router()


//* ===== Authenticación, Registro y Confirmación de Usuarios =======
router.post('/', registrar);                            //? Crea un nuevo usuario
router.post('/login', autenticar);                      //? login(iniciar sesion)
router.get('/confirmar/:token', confirmar)              //? confirmar la cuenta via token
router.post('/olvide-password', olvidePassword)         //? se envia email para restablecer password
// router.get('/olvide-password/:token', comprobarToken)   
// router.post('/olvide-password/:token', NuevoPassword)   
router.route('/olvide-password/:token')
   .get(comprobarToken)                                 //? check token del que solicito restablecer password
   .post(NuevoPassword)                                 //? check token del que solicito restablecer password





export default router;