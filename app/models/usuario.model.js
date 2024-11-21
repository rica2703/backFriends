const mongoose = require("mongoose");

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    username: String,
    nombre: String,
    password: String,
    estado:Boolean,
    avatar:String,
  })
);

module.exports = Usuario;
