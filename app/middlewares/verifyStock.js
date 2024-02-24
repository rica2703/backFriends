const db = require("../models");
const Stock = db.stock;

revisarNombreStock = (req, res, next) => {
  // Username
  Stock.findOne({
    nombre: req.body.nombre
  }).exec((err, stock) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (stock) {
      res.status(400).send({ message: "Failed! this  product is already in use!" });
      return;
    }

    // Email
    // User.findOne({
    //   email: req.body.email
    // }).exec((err, user) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }

    //   if (user) {
    //     res.status(400).send({ message: "Failed! Email is already in use!" });
    //     return;
    //   }

    //   next();
    // });
  });
};


// const revisarNombreStock = {
//   revisarNombreStock,
// };

module.exports = revisarNombreStock;
