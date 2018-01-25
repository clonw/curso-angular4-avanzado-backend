'use strict';
//use sctrict nos permite usar nuevas fucnionalidades de javascript

////Confiruación de body-parser y exporess/////
//esto nos sirve para cargar el módulo de express
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');


//// middlewares de body-parser
// los midleware se ejecutan cuando recibimos una llamada por rest, pero antes de procesar la llamada
        //configuración necesaria para body-parser
app.use(bodyParser.urlencoded({extended:false}));
    //ahora le decimos que nos convierta lo quer traiga el cuerpo a JSON
app.use(bodyParser.json());

// configurar cabeceras y cors

// rutas base
    //añadimos un prefijo para que nuestra API se acceda por api/pruebas-del-controlador
app.use('/api', user_routes);

app.get('/probando', (req, res) =>{
    res.status(200).send({message: 'Este es el método probando'});
});

//cada fichero que yo cree en nodejs si yo lo exporto es un modulo que yo puedo importat luego enun fichero
module.exports = app;

////Fin Confiruación de body-parser y exporess/////