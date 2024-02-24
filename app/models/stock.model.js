const mongoose = require("mongoose");

const Stock = mongoose.model(
  "Stock",
  new mongoose.Schema({
    nombre: String,
    precio: Number,
    imagen:String,
    estado:String,
  })
);

module.exports = Stock;
