const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

//limitar peticiones 
// const express=require("express");
// const rateLimit=require("express-rate-limit");
// const app=express();
// const accountLimiter=rateLimit({
// windowMs:60*60*1000,
// max:6,
// message:"Demasiadas peticiones intenta en 1 hora"
// });
// app.post("/api/auth/signin",accountLimiter,(req,res)=>{controller.signin});
// app.listen(8080,()=>console.log(`app ejecutando en puerto 8080 peticiones maximas`));

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      // verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  //app.get("/api/auth/users",[authJwt.verifyToken],controller.getAllUsers);
  app.get("/api/auth/users",controller.getAllUsers);
  app.get("/api/auth/user/:username",controller.getUserById);
  app.get("/api/auth/users/active",controller.getActiveUsers);
  app.post("/api/auth/signin",controller.signin);
  app.post("/api/auth/createPost",controller.createPost);
  app.get("/api/auth/Posts",controller.getAllPost);
  app.put("/api/auth/editPost/:id",controller.editPost);
  app.delete("/api/auth/deletePost/:id",controller.deletePost);
  // app.delete("/api/auth/eliminarproducto/:id", [authJwt.verifyToken], controller.eliminarProducto);
  // app.get("/api/auth/productos",controller.getAllProducts); //no lo protegi por cuestiones de que necesito ver el id para hacer pruebas de demostracion del delete
  // app.post("/api/auth/crearsugerencia",controller.crearSugerencia);
  // app.get("/api/auth/sugerencias",[authJwt.verifyToken],controller.getAllSugerencias);
  // app.post("/api/auth/crearPedido",[authJwt.verifyToken],controller.crearPedido);
  // app.put("/api/auth/editarpedido/:id", [authJwt.verifyToken], controller.editarPedido);
  // app.get("/api/auth/pedidos",controller.getAllPedidos);//no lo protegi por cuestiones de que necesito ver el id para hacer pruebas de demostracion del put
  // app.post("/api/auth/crearreporte",[authJwt.verifyToken],controller.crearReporte);
  // app.get("/api/auth/reporte",[authJwt.verifyToken],controller.getAllReportes);
  // app.delete("/api/auth/rechazarPedido",[authJwt.verifyToken],controller.rechazarPedido);
};
