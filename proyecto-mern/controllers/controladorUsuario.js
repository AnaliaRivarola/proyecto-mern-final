
const Usuarios = require('./../models/modeloUsuario');
const {Mascota} = require('./../models/modeloMascota');
const jwt = require('jsonwebtoken'); 
const clave='adoptMe';



/**Listar Usuarios */
module.exports.usuarios= (req, res) => {
    console.log(req.infoUsuario);
    Usuarios.find()
      .then((listaUsuarios)=> {
          return res.status(200).json(listaUsuarios);
      })
      .catch((error) => {
          return res.stauts(400).json(error);
      });
    
}

/**Agregar Usuario */
module.exports.agregarUsuario = (req, res) => {
    Usuarios.create(req.body)
        .then((nuevoUsuario) => {
            const infoEnToken = {
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                edad: nuevoUsuario.edad,
                correo: nuevoUsuario.correo, 
                constrasena: nuevoUsuario.contrasena,
                telefono: nuevoUsuario.telefono,
                ciudad: nuevoUsuario.ciudad,
                rol: nuevoUsuario.rol,
                estiloDeVida: nuevoUsuario.estiloDeVida
        }
        jwt.sign(infoEnToken, clave, {expiresIn: '1m'}, (error, token) => {
            if(error){
                return res.status(400).json({mensaje: 'Error al generar el token'});
            }
            return res.status(200).json({token});
        });
    })
    .catch((error) => {
        console.log(error.message);
        res.statusMessage = error.message;
        return res.status(400).json(error.message);
    });
};


       

/**Editar usuario */
module.exports.actualizarUsuario = (req, res) => {
     const camposParaActualizar = {}; 
     const {nombre, apellido, edad, correo, contrasena, telefono, ciudad, rol, estiloDeVida } = req.body; 

     if(nombre) {
        camposParaActualizar.nombre = nombre; 
     }

     if(apellido){
        camposParaActualizar.apellido = apellido; 
     }

     if(edad){
        camposParaActualizar.edad = edad; 
     }

     if(correo){
        camposParaActualizar.correo = correo;
     }
     
     if(contrasena) {
        camposParaActualizar.contrasena = contrasena; 
     }

     if(telefono){
         camposParaActualizar.telefono = telefono ; 
     }

     if(ciudad) {
        camposParaActualizar.ciudad = ciudad; 
     }

     if(rol) {
        camposParaActualizar.rol = rol;
     }

     if(estiloDeVida) {
        camposParaActualizar.estiloDeVida= estiloDeVida; 
     }
    
     Usuarios.findOneAndUpdate({correo: req.infoUsuario.correo}, camposParaActualizar, {new: true})
        .then((usuarioActualizado) => {
            return res.status(200).json(usuarioActualizado);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });

}


/**Eliminar Usuario */
module.exports.removerUsuario = (req, res) => {
    Usuarios.findOneAndDelete({correo: req.infoUsuario.correo})
        .then(() => {
            return res.status(204).end();
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};






/**Login */

module.exports.login= (req, res) => {
    const {correo, contrasena} = req.body; 

    Usuarios.findOne({correo, contrasena})
        .then((usuarioEncontrado) => {
            if(!usuarioEncontrado){
                res.statusMessage = 'Credenciales incorrectas.';
                return res.status(404).json({mensaje: 'Credenciales incorrectas.'});
            }

           const infoEnToken = {
             nombre: usuarioEncontrado.nombre, 
             apellido: usuarioEncontrado.apellido, 
             correo: usuarioEncontrado.correo, 
             rol:usuarioEncontrado.rol
           }

           jwt.sign(infoEnToken, clave, {expiresIn: '1m'}, (error, token) => {
              if(error){
                  return res.status(400).json({mensaje: 'Error al generar el token'})
              }
              return res.status(200).json({token}); 
           });

       })
       .catch((error) => {
            return res.status(400).json(error);
       });
}; 