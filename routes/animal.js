'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

//router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
// dir donde se van a guardar kas imagenes de los animales
var md_upload = multipart({uploadDir: './uploads/animals'});


//pasamos md_auth como midleware, se ejecutará antes que UserController.pruebas. además  md_auth.ensureAuth ejecutará el método interno next() para pasar a UserController.pruebas
api.get('/pruebas-animales',md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal',md_auth.ensureAuth, AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id',AnimalController.getAnimal);
api.put('/animal/:id',md_auth.ensureAuth, AnimalController.updateAnimal);
api.post('/upload-image-animal/:id',[md_auth.ensureAuth, md_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id',AnimalController.deleteAnimal);


module.exports = api;