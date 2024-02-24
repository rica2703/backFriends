const mongoose = require("mongoose");

const Pedidos = mongoose.model(
  "Pedidos",
  new mongoose.Schema({
    mesa: Number,
    noPedido: Number,
    total:Number,
    orden:String,
  })
);

module.exports = Pedidos;
