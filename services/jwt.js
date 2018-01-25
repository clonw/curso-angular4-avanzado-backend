'use strict'

//
var jwt = require('jwt-simple');
// nos permite  generar un timestamp, trabajar con fechas...
var moment = require('moment');
var secret = 'clae:secreta_del_curso_de_angular4avanzado';

exports.createToken = function(user){
    // un obj para que jwt genere el token
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat:moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode( payload, secret);
};