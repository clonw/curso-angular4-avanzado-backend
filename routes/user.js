'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//router de express
var api = express.Router();

api.get('/pruebas-del-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;