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
      return res.status(403).json({ msg: error.message });
   }

   try {
      const tareaAlmacenada = await Tarea.create(req.body);

      // almacenar el ID el proyecto en el campo tareas que es un array
      existeProyecto.tareas.push(tareaAlmacenada._id);
      await existeProyecto.save();

      res.json(tareaAlmacenada);

   } catch (error) {
      console.log(error)
   }

}



//* ==========> Obtener Tarea <==========
const obtenerTarea = async(req, res) => {
   console.log('Hola')
   const { id } = req.params

   // verificanmos que la tarea exista
   const tarea = await Tarea.findById(id).populate('proyecto')   

   // validamos si existe la tarea
   if(!tarea) {
      const error = new Error('Tarea no encontrada')         
      return res.status(404).json({ msg: error.message });
   }

   // validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(403).json({ msg: error.message });
   }

   res.json(tarea)   
}



//* ==========> Actualizar Tarea <==========
const actualizarTarea = async(req, res) => {
   const { id } = req.params

   // verificanmos que la tarea exista
   const tarea = await Tarea.findById(id).populate('proyecto')   

   // validamos si existe la tarea
   if(!tarea) {
      const error = new Error('Tarea no encontrada')         
      return res.status(404).json({ msg: error.message });
   }

   // validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(403).json({ msg: error.message });
   }

   tarea.nombre = req.body.nombre || tarea.nombre;
   tarea.descripcion = req.body.descripcion || tarea.descripcion;
   tarea.prioridad = req.body.prioridad || tarea.prioridad;
   tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

   try {
      const tareaAlmacenada = await tarea.save();
      res.json(tareaAlmacenada);
   } catch (error) {
      console.log(error)
   }
}



//* ==========> Eliminar Tarea <==========
const eliminarTarea = async(req, res) => {
   const { id } = req.params

   // verificanmos que la tarea exista
   const tarea = await Tarea.findById(id).populate('proyecto')   

   // validamos si existe la tarea
   if(!tarea) {
      const error = new Error('Tarea no encontrada')         
      return res.status(404).json({ msg: error.message });
   }

   // validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(403).json({ msg: error.message });
   }

   try {
      await tarea.deleteOne();
      res.json({ msg: 'La Tarea ha sido eliminada' }); 

   } catch (error) {
      console.log(error)
   }
}



//* ==========> Cambiar Estado de una Tarea <==========
const cambiarEstado = async(req, res) => {
   const { id } = req.params

   // verificanmos que la tarea exista
   const tarea = await Tarea.findById(id).populate('proyecto')   

   // validamos si existe la tarea
   if(!tarea) {
      const error = new Error('Tarea no encontrada')         
      return res.status(404).json({ msg: error.message });
   }

   // validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(
      tarea.proyecto.creador.toString() !== req.usuario._id.toString() && 
      !tarea.proyecto.colaboradores.some(
         colaborador => colaborador._id.toString() === req.usuario._id.toString()
      )    
   ){      
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(403).json({ msg: error.message });
   }

   tarea.estado = !tarea.estado;
   await tarea.save()

   res.json(tarea)
}


export {
   crearTarea,
   obtenerTarea,
   actualizarTarea,
   eliminarTarea,
   cambiarEstado,
}