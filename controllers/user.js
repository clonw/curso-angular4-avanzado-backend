'use strict'
//Un comentario de prueba
//modulos
    //para el cifrado de password
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
    // nos permite acceder a rutas directamente en nuestro sistema de archivos
var path = require('path');

//modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuario y la acción pruebas',
        // este objeto user lo hemos pasado en el midleware en el método ensureAuth,
        //cuando hemos hecho req.user = payload;
        user: req.user
    });
}

function saveUser(req, res){
    //crear el objeto del usuario
    var user = new User();

    //recogemos los parametros que me llegan en la peticion (el body)
    var params = req.body;


    if( params.password && params.name && params.surname && params.email){
        
        //asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({email: user.email.toLowerCase()},(err, issetUser)=>{
            if(err){
                res.status(500).send({message: 'error al comprobar el usuario'});
            } else {
                if(!issetUser){
                    //Cifrar la contraseña
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password = hash;

                        //guardar user en BBDD
                        user.save((err, userStored)=>{
                            if(err){
                                res.status(500).send({
                                    message: 'error al guardar el usuario'
                                });
                            } else {
                                if(!userStored){
                                    res.status(404).send({
                                        message: 'No se ha registrado el usuario'
                                    }); 
                                } else {
                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        } );
                    });
                } else {
                    res.status(200).send({
                        message: 'El usuario no puede registrarse'
                    });
                }
            }
        });
            
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        });
    }
}

function login(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err, user)=>{
        if(err){
            res.status(500).send({message: 'error al comprobar el usuario'});
        } else {
            if(user){
                bcrypt.compare(password, user.password,(err, check) =>{
                    if(check){
                        //Comprobar y generar el token
                        if(params.gettoken){
                            //devolver el token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            }); 
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({
                            message: 'Usuario / pass inválidos'
                        });
                    }
                });
            } else {
                res.status(404).send({menssage: 'el usuario no ha podido loguearse'});
            }
        }
    });
}




function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        return res.status(200).send({
            message : 'no tienes permisos para actualizar el usuario'
        });
    }
    // con {new:true} lo que hacemos es pedir que nos de el registro que hemos actualizado,
    // si no nos devolvería el  useerUpdated con el valor que tenía antes en la BD
    User.findByIdAndUpdate(userId, update, {new:true},(err, userUpdated) => {
        if(err){
            res.status(500).send({
                message:'error al Actualizar usuario'
            });
        } else {
            if(!userUpdated){
                res.status(400).send({message:'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user:userUpdated});
            }
        }
    });


}


function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'no subido...';

    //El file me lo proporciona multi-party 
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
            if(userId != req.user.sub){
                return res.status(500).send({
                    message : 'no tienes permisos para actualizar el usuario'
                });
            }

            User.findByIdAndUpdate(userId, {image:file_name}, {new:true},(err, userUpdated) => {
                if(err){
                    res.status(500).send({
                        message:'error al Actualizar usuario'
                    });
                } else {
                    if(!userUpdated){
                        res.status(400).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        res.status(200).send({user:userUpdated, image: file_name});
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err)=>{
                if(err){
                    res.status(200).send({message:'Extension no válida y fichero no borrado'});
                } else {
                    res.status(200).send({message:'Extension no válida'});
                }
            });
        }

    }else{
        res.status(200).send({message:'No se han subido ficheros'});
    }

}


function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe'});
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile
};