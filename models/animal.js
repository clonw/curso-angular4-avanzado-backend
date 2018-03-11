'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    //Con type: Schema.ObjectId le indico que se va a guradr un id de otro documento de la base de datos
    user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Animal', AnimalSchema);