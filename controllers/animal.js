'use strict'

//Un comentario de prueba
//modulos
    //para el cifrado de password
    
    var fs = require('fs');
        // nos permite acceder a rutas directamente en nuestro sistema de archivos
    var path = require('path');
    
    //modelos
    var User = require('../models/user');
    var Animal = require('../models/animal');
    
    //acciones
    function pruebas(req, res){
        res.status(200).send({
            message: 'Probando el controlador de animales y la acción pruebas',
            // este objeto user lo hemos pasado en el midleware en el método ensureAuth,
            //cuando hemos hecho req.user = payload;
            user: req.user
        });
    }

module.exports = {
    pruebas
};