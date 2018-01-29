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

function saveAnimal(req, res){
    var animal = new Animal();

    var params = req.body;

    if(params.name){
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored) =>{
            if(err){
                res.status(500).send({message: "Error en el servidor"});
            } else {
                if(!animalStored){
                    res.status(404).send({message: 'No se ha guardado el animal'});
                } else{
                    res.status(200).send({animal: animalStored});
                }
            }
        });
    } else{
        res.status(200).send({message:'El nombre del animal es obligatorio'});
    }
}

module.exports = {
    pruebas,
    saveAnimal
};