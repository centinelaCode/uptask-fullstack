import mongoose from 'mongoose'
import Proyecto from '../models/Proyecto.js';
import Usuario from '../models/Usuario.js';


//* ==========> Obtenemo todos los proyectos de usuario <==========
const obtenerProyectos = async(req, res) => {
   // const {_id } = req.usuario

   // const proyectos = await Proyecto.find({ creador: _id })
   const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select("-tareas")
   res.json(proyectos)
}



//* ==========> Obtenemos un proyecto <==========
const obtenerProyecto = async(req, res) => {
   const { id } = req.params;
  
   // Verificamos si existe el proyecto
   const proyecto = await Proyecto.findById(id).populate('tareas')
   if(!proyecto) {
      const error = new Error('El Proyecto no existe')         
      return res.status(404).json({ msg: error.message });
   }   
  
   // Si proyecto si existe validamos que el proyecto pertenezca al usuario authenticado o es colaborador
   if(proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida - Acceso denegado')         
      return res.status(401).json({ msg: error.message });
   }

   // Obtener las Tareas del proyecto
   // const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);   
   
   // la respuesta incluye el proyecto y las tareas asociadas a ese proyecto
   res.json(proyecto)
   
   // res.json({   
   //       proyecto,
   //       tareas,
   // }
   
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
const editarProyecto = async(req, res) => {
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

   // si proyecto existe y pertencece al usuario auth o es colaborador lo podemos actualiar
   proyecto.nombre = req.body.nombre || proyecto.nombre;
   proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
   proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
   proyecto.cliente = req.body.cliente || proyecto.cliente;
   
   try {
      const proyectoActualizado = await proyecto.save();
      res.json(proyectoActualizado);   

   } catch (error) {
      console.log(error)      
   }
}



//* ==========> Eliminar un proyecto <==========
const eliminarProyecto = async(req, res) => {
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

   // si proyecto existe y pertencece al usuario auth o es colaborador lo poedmos eliminar  
   try {
      await proyecto.deleteOne();
      res.json({ msg: 'Proyecto Eliminado Correctamente' }); 

   } catch (error) {
      console.log(error)      
   }
}


//* ==========> Buscar Colaborador <==========
const buscarColaborador = async(req, res) => {
   const {email} = req.body;
   console.log(email)

   // buscamos si hay un usuario registrado con ese email
   const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')
   console.log(usuario)

   // validamos si existe el usurio
   if(!usuario) {      
      const error = new Error('Usuario no encontrado')               
      return res.status(404).json({ msg: error.message });
   }

   res.json(usuario);
}


//* ==========> Agregar Colaborador <==========
const agregarColaborador = async(req, res) => {}



//* ==========> Eliminar Colaborador <==========
const eliminarColaborador = async(req, res) => {}



export {
   obtenerProyectos,
   obtenerProyecto,
   nuevoProyecto,
   editarProyecto,
   eliminarProyecto,
   agregarColaborador,
   eliminarColaborador,
   buscarColaborador,
}