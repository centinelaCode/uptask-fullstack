import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js'  


//* ==========> Crea Tarea <==========
const crearTarea = async(req, res) => {
   const { proyecto } = req.body;
   
   const existeProyecto = await Proyecto.findById(proyecto);
   
   // Verificamos si existe el proyecto
   if(!existeProyecto) {
      const error = new Error('El Proyecto no existe')         
      return res.status(404).json({ msg: error.message });
   }

   // Si proyecto si existe validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(401).json({ msg: error.message });
   }

   try {
      const tareaAlmacenada = await Tarea.create(req.body);
      res.json(tareaAlmacenada);

   } catch (error) {
      console.log(error)
   }

}



//* ==========> Obtener Tarea <==========
const obtenerTarea = async(req, res) => {}



//* ==========> Actualizar Tarea <==========
const actualizarTarea = async(req, res) => {}



//* ==========> Eliminar Tarea <==========
const eliminarTarea = async(req, res) => {}



//* ==========> Cambiar Estado de una Tarea <==========
const cambiarEstado = async(req, res) => {}


export {
   crearTarea,
   obtenerTarea,
   actualizarTarea,
   eliminarTarea,
   cambiarEstado,
}