const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const   db = {};

db.mongoose = mongoose;

db.usuario = require("./usuario.model");
db.publicacion=require("./publicacion.model");

module.exports = db;