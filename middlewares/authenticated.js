'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clae:secreta_del_curso_de_angular4avanzado';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        res.status(403).send({message: 'la petición no tiene la cabecera de autenticación' });
    } 
    //quitamos la comillas del token y lo guardamos
    var token = req.headers.authorization.replace( /['"']+/g,'');

    try {
        //creo un objeto completo. Podría hacer payload.sub o payload.name
        var payload = jwt.decode(token, secret);
        //miramos si el token ha expirado
        if(payload.exp <= moment.unix){
           return res.status(401).send({
               message: 'El token ha expirado'
           })
        }
    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es válido'
        })
    }

    req.user = payload;

    next();
}