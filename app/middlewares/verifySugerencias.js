const db = require("../models");
const Sugerencias = db.sugerencias;

revisarSugerencia = (req, res, next) => {
  // Username
  Sugerencias.findOne({
    id: req.body.id
  }).exec((err, sugerencias) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (sugerencias) {
      res.status(400).send({ message: "Failed! this id is already in use!" });
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

module.exports = revisarSugerencia;
