const config = require("../config/auth.config");
const db = require("../models");
// const User = db.user;
// const Role = db.role;
// const Stock = db.stock;
// const Sugerencias = db.sugerencias;
// const Pedidos = db.pedidos;
// const Reportes = db.reporte;
const Usuario = db.usuario;
const Publicacion = db.publicacion;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require("express");

// exports.rechazarPedido = (req, res) => {
//   const { orden } = req.body;

//   // Aquí debes implementar la lógica para eliminar el pedido de tu base de datos
//   // Por ejemplo, puedes utilizar el método findByIdAndDelete si estás utilizando Mongoose

//   // Ejemplo con Mongoose
//   Pedidos.findOneAndDelete({ orden: orden }, (err, pedido) => {
//     if (err) {
//       res.status(500).send({ message: 'Error al eliminar el pedido.' });
//       return;
//     }

//     if (!pedido) {
//       res.status(404).send({ message: 'Pedido no encontrado.' });
//       return;
//     }

//     res.status(200).send({ message: 'Pedido eliminado correctamente.' });
//   });
// };

// exports.eliminarProducto = (req, res) => {
//   const productId = req.params.id;

//   if (!req.userId) {
//     return res.status(403).send({ message: "No tienes autorizacion! " });
//   }

//   Stock.findByIdAndDelete(productId, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err });
//     }

//     if (!result) {
//       return res.status(404).send({ message: "Producto no encontrado." });
//     }

//     res.status(200).send({ message: "Producto eliminado correctamente!" });
//   });
// };

// exports.editarPedido = (req, res) => {
//   const pedidoId = req.params.id;

//   Pedidos.findByIdAndUpdate(
//     pedidoId,
//     {
//       mesa: req.body.mesa,
//       noPedido: req.body.noPedido,
//       total: req.body.total,
//       orden: req.body.orden,
//     },
//     { new: true }
//   )
//     .then((pedido) => {
//       if (!pedido) {
//         return res.status(404).send({ message: "Pedido no encontrado" });
//       }
//       res.status(200).send({ message: "Pedido editado correctamente", pedido });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error al editar el pedido" });
//     });
// };

// exports.crearReporte = (req, res) => {
//   const reporte = new Reportes({
//     fecha: req.body.fecha,
//     total: req.body.total,
//     pedido: req.body.pedido,
//     mesa: req.body.mesa,
//   });
//   reporte.save((err, reporte) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     res.status(200).send({ message: "Reporte creado correctamente" });
//   });
// }
// exports.getAllReportes = (req, res) => {
//   Reportes.find()
//     .then((reporte) => {
//       res.status(200).json(reporte);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error retrieving reporte." });
//     });
// }

// exports.crearPedido = (req, res) => {
//   const pedido = new Pedidos({
//     mesa: req.body.mesa,
//     noPedido: req.body.noPedido,
//     total: req.body.total,
//     orden: req.body.orden,
//   });
//   pedido.save((err, pedido) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     res.status(200).send({ message: "Pedido creado correctamente" });
//   });
// }
// exports.getAllPedidos = (req, res) => {
//   Pedidos.find()
//     .then((pedido) => {
//       res.status(200).json(pedido);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error retrieving pedidos." });
//     });
// }


// exports.crearSugerencia = (req, res) => {
//   const sugerencia = new Sugerencias({
//     mesa: req.body.mesa,
//     fecha: req.body.fecha,
//     mensaje: req.body.mensaje,
//     tipo: req.body.tipo,
//   });
//   sugerencia.save((err, sugerencia) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     res.status(200).send({ message: "Sugerencia creada correctamente" });
//   });
// }
// exports.getAllSugerencias = (req, res) => {
//   Sugerencias.find()
//     .then((sugerencia) => {
//       res.status(200).json(sugerencia);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error retrieving sugerencias." });
//     });
// }

// exports.createProduct = (req, res) => {
//   const stock = new Stock({
//     nombre: req.body.nombre,
//     precio: req.body.precio,
//     imagen: req.body.imagen,
//     estado: req.body.estado,
//   });
//   stock.save((err, stock) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     // res.status(200).send({ message: "Product created successfully!" });
//     res.status(200).send({
//       id: stock._id,
//       nombre: stock.nombre,
//       precio: stock.precio,
//       imagen: stock.imagen,
//       esatdo: stock.estado,
//     });
//   });
// }
// exports.getAllProducts = (req, res) => {
//   Stock.find()
//     .then((products) => {
//       res.status(200).json(products);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message || "Error retrieving products." });
//     });
// }

exports.createPost = (req, res) => {
  const publicacion = new Publicacion({
    username: req.body.username,
    texto: req.body.texto,
  });
  publicacion.save((err, publicacion) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    publicacion.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "post was created successfully!" });
    });
  });
};
exports.getAllPost = (req, res) => {
  Publicacion.find()
    .then((publicacion) => {
      res.status(200).json(publicacion);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving posts." });
    });
}
exports.editPost = (req, res) => {
  const postId = req.params.id;

  Publicacion.findByIdAndUpdate(
    postId,
    {
      username: req.body.username,
      texto: req.body.texto,
    },
    { new: true }
  )
    .then((publicacion) => {
      if (!publicacion) {
        return res.status(404).send({ message: "Publicacion no encontrada" });
      }
      res.status(200).send({ message: "Publicacion editada correctamente", publicacion });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al editar publicacion" });
    });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;

  // if (!req.usuarioId) {
  // return res.status(403).send({ message: "No tienes autorizacion! " });
  //}

  Publicacion.findByIdAndDelete(postId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!result) {
      return res.status(404).send({ message: "Publicacion no encontrada." });
    }

    res.status(200).send({ message: "Publicacion eliminada correctamente!" });
  });
};

exports.getAllUsers = (req, res) => {
  Usuario.find()
    .then((usuario) => {
      res.status(200).json(usuario);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error retrieving users." });
    });
}

exports.signup = (req, res) => {
  const usuario = new Usuario({
    username: req.body.username,
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.password, 8),
    estado: req.body.estado,
    avatar: req.body.avatar,
  });
  usuario.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    usuario.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!" });
    });
  });
};

exports.signin = (req, res) => {
  Usuario.findOne({
    username: req.body.username
  })
    // .populate("roles", "-__v")
    .exec((err, usuario) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!usuario) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        usuario.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      usuario.estado = true;
      usuario.save((err, updatedUser) => {
        if (err) {


          return res.status(500).send({ message: "Error al actualizar el estado del usuario." });
        }

        const token = jwt.sign({ id: usuario.username },
          config.secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          });

        var authorities = [];

        // for (let i = 0; i < user.roles.length; i++) {
        //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        // }
        res.status(200).send({
          // id: user._id,
          username: updatedUser.username,
          nombre: updatedUser.nombre,
          estado: updatedUser.estado,
          avatar: updatedUser.avatar,
          accessToken: token
        });
      });
    });
};

exports.getUserById = (req, res) => {
  const username = req.params.username; // Extraemos el username de los parámetros de la ruta
  // const usuario = new Usuario({
  //   username:req.body.username,
  //   nombre:req.body.nombre,
  //   avatar: req.body.avatar,
  // });
  Usuario.findOne({ username: username }, (err, usuario) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!usuario) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send(usuario);
  })
};

exports.getActiveUsers = (req, res) => {
  Usuario.find({ estado: true }, (err, usuarios) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!usuarios || usuarios.length === 0) {
return res.status(404).send({ message: "No se encontraron usuarios activos." });
    }
    res.status(200).send(usuarios);
  });
};
