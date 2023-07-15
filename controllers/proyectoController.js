import mongoose from 'mongoose'
import Proyecto from '../models/Proyecto.js';


//* ==========> Obtenemo todos los proyectos de usuario <==========
const obtenerProyectos = async(req, res) => {
   // const {_id } = req.usuario

   // const proyectos = await Proyecto.find({ creador: _id })
   const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
   res.json(proyectos)
}



//* ==========> Obtenemos un proyecto <==========
const obtenerProyecto = async(req, res) => {

   const { id } = req.params;
  
   // Verificamos si existe el proyecto
   const proyecto = await Proyecto.findById(id)
   if(!proyecto) {
      const error = new Error('El Proyecto no existe')         
      return res.status(404).json({ msg: error.message });
   }   
  
   // Si proyecto si existe validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(401).json({ msg: error.message });
   }
   
   // si proyecto existe y pertencece al usuario auth o es colaborador
   res.json(proyecto);   
}



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
   console.log(proyecto)
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