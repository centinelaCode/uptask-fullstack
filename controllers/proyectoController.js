import Proyecto from '../models/Proyecto.js';


//* ==========> Obtenemo todos los proyectos de usuario <==========
const obtenerProyectos = async(req, res) => {}



//* ==========> Obtenemos un proyecto <==========
const obtenerProyecto = async(req, res) => {}



//* ==========> Crea un proyecto <==========
const nuevoProyecto = async(req, res) => {
   const proyecto = new Proyecto(req.body)   //? Instanciamos proyecto con req.body
   proyecto.creador = req.usuario._id

   try {
      const proyectoAlmacenado = await proyecto.save();
      res.json(proyectoAlmacenado)

   } catch (error) {
      console.log(error)      
   }   
}



//* ==========> Actualizar un proyecto <==========
const editarProyecto = async(req, res) => {}



//* ==========> Eliminar un proyecto <==========
const eliminarProyecto = async(req, res) => {}



//* ==========> Agregar Colaborador <==========
const agregarColaborador = async(req, res) => {}



//* ==========> Eliminar Colaborador <==========
const eliminarColaborador = async(req, res) => {}



//* ==========> Obtener Tareas <==========
const obtenerTareas = async(req, res) => {}


export {
   obtenerProyectos,
   obtenerProyecto,
   nuevoProyecto,
   editarProyecto,
   eliminarProyecto,
   agregarColaborador,
   eliminarColaborador,
   obtenerTareas,
}