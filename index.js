'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //--> Cargamos el módulo que hemos creado en app.js para body-parser y express
var port = process.env.PORT || 3789;
var credentials = require('./private/credentials');

var user = credentials.user;
var pass = credentials.pass;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + user + ':' + pass + '@ds261128.mlab.com:61128/zoo',{useMongoClient:true})
// mongoose.connect('mongodb://localhost:27017/zoo',{useMongoClient:true})
        .then(() =>{
                console.log('la conexion a la bd a zoo se ha creado correctamente');    
                //nos permite crear un servidor web con nodejs
                app.listen(port,() => {
                        console.log("servidor local con node y express está corriendo correctamente");
                });
        })
.       catch(err => console.log(err));