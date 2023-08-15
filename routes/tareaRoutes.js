import express from 'express'

import {
   crearTarea,
   obtenerTarea,
   actualizarTarea,
   eliminarTarea,
   cambiarEstado,
} from '../controllers/tareaController.js'
import checkAuth from '../middlewares/checkAuth.js';


const router = express.Router();

router.post('/', checkAuth, crearTarea)
router.route('/:id')
   .get(checkAuth, obtenerTarea)
   .put(checkAuth, actualizarTarea)
   .delete(checkAuth, eliminarTarea)

router.post('/estado/:id', checkAuth, cambiarEstado)

export default router;