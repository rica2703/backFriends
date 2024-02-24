const mongoose = require("mongoose");

const Reporte = mongoose.model(
  "Reporte",
  new mongoose.Schema({
    fecha:String,
    total: Number,
    pedido:String,
    mesa:Number,
  })
);

module.exports = Reporte;
