
const express = require('express');
const routerUsuario = express.Router();
const UsuarioController = require('./../controllers/controladorUsuario');
const validarToken= require('./../middlewares/validarToken'); 

/**Login y registro */
routerUsuario.post('/login', UsuarioController.login); 
routerUsuario.post('/nuevo', UsuarioController.agregarUsuario);

/** RUtas validadas con token */

routerUsuario.delete('/elimiarUsuario/:correo', validarToken, UsuarioController.removerUsuario); 
routerUsuario.put('/actualizar/:correo', validarToken, UsuarioController.actualizarUsuario);
routerUsuario.get('/', validarToken, UsuarioController.usuarios); 



module.exports = routerUsuario; 