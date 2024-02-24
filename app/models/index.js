const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const   db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.stock=require("./stock.model");
db.sugerencias=require("./sugerencias.model");
db.pedidos=require("./pedidos.model");
db.reporte=require("./reporte.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;