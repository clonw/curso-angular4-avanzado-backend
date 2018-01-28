'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
// dir donde se van a guardar kas imagenes de los usuarios
var md_upload = multipart({uploadDir: './uploads/users'});


//pasamos md_auth como midleware, se ejecutará antes que UserController.pruebas. además  md_auth.ensureAuth ejecutará el método interno next() para pasar a UserController.pruebas
api.get('/pruebas-del-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
//para actualozar algo de la BBDD
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);
api.get('/keepers', UserController.getKeepers);
module.exports = api;