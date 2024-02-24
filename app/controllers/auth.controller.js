const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Stock=db.stock;
const Sugerencias=db.sugerencias;
const Pedidos=db.pedidos;
const Reportes=db.reporte;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.crearReporte=(req,res)=>{
  const reporte=new Reportes({
    fecha:req.body.fecha,
    total:req.body.total,
    pedido:req.body.pedido,
    mesa:req.body.mesa,
  });
  reporte.save((err,reporte)=>{
    if(err){
      res.status(500).send({message:err});
      return;
    }
    res.status(200).send({message:"Reporte creado correctamente"});
  });
}
exports.getAllReportes=(req,res)=>{
  Reportes.find()
  .then((reporte) => {
    res.status(200).json(reporte);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error retrieving reporte." });
  });
}

exports.crearPedido=(req,res)=>{
  const pedido=new Pedidos({
    mesa:req.body.mesa,
    noPedido:req.body.noPedido,
    total:req.body.total,
    orden:req.body.orden,
  });
  pedido.save((err,pedido)=>{
    if(err){
      res.status(500).send({message:err});
      return;
    }
    res.status(200).send({message:"Pedido creado correctamente"});
  });
}
exports.getAllPedidos=(req,res)=>{
  Pedidos.find()
  .then((pedido) => {
    res.status(200).json(pedido);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error retrieving pedidos." });
  });
}


exports.crearSugerencia=(req,res)=>{
  const sugerencia=new Sugerencias({
    mesa:req.body.mesa,
    fecha:req.body.fecha,
    mensaje:req.body.mensaje,
    tipo:req.body.tipo,
  });
  sugerencia.save((err,sugerencia)=>{
    if(err){
      res.status(500).send({message:err});
      return;
    }
    res.status(200).send({message:"Sugerencia creada correctamente"});
  });
}
exports.getAllSugerencias=(req,res)=>{
  Sugerencias.find()
  .then((sugerencia) => {
    res.status(200).json(sugerencia);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error retrieving sugerencias." });
  });
}

exports.createProduct=(req,res)=>{
  const stock=new Stock({
    nombre:req.body.nombre ,
    precio:req.body.precio ,
    imagen:req.body.imagen,
    estado:req.body.estado,
  });
  stock.save((err,stock)=>{
    if(err){
      res.status(500).send({message:err});
      return;
    }
    // res.status(200).send({ message: "Product created successfully!" });
    res.status(200).send({
      id: stock._id,
      nombre: stock.nombre,
      precio: stock.precio,
      imagen:stock.imagen,
      esatdo:stock.estado,
    });
  });
}
exports.getAllProducts=(req,res)=>{
  Stock.find()
  .then((products) => {
    res.status(200).json(products);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error retrieving products." });
  });
}

exports.getAllUsers=(req,res)=>{
  User.find()
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error retrieving users." });
  });
}

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    nombre:req.body.nombre,
    apellidos:req.body.apellidos,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
