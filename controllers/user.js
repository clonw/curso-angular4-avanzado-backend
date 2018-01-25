'use strict'
//Un comentario de prueba
//modulos
    //para el cifrado de password
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuario y la acción pruebas'
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


function getImageFile(req, res){
    res.status(200).send({menssage: 'get Image File'});
}

module.exports = {
    pruebas,
    saveUser,
    login
};