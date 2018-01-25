'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //--> Cargamos el módulo que hemos creado en app.js para body-parser y express
var port = process.env.PORT || 3789;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo',{useMongoClient:true})
        .then(() =>{
                console.log('la conexion a la bd a zoo se ha creado correctamente');    
                //nos permite crear un servidor web con nodejs
                app.listen(port,() => {
                        console.log("servidor local con node y express está corriendo correctamente");
                });
        })
.       catch(err => console.log(err));