'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//pasamos md_auth como midleware, se ejecutará antes que UserController.pruebas. además  md_auth.ensureAuth ejecutará el método interno next() para pasar a UserController.pruebas
api.get('/pruebas-del-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
//para actualozar algo de la BBDD
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);

module.exports = api;