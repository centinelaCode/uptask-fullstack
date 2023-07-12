import express from 'express'

const router = express.Router()


//? uri_base_usuarios: '/api/usuarios'
router.get('/', (req, res) => {
   res.send('GET: Desde API/USUARIOS')
})



export default router;