const mongoose = require("mongoose");

const Sugerencias = mongoose.model(
  "Sugerencias",
  new mongoose.Schema({
    mesa: Number,
    fecha: String,
    mensaje:String,
    tipo:String,
  })
);

module.exports = Sugerencias;
