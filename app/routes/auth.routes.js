const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.get("/api/auth/users",controller.getAllUsers);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/crearproducto",controller.createProduct);
  app.get("/api/auth/productos",controller.getAllProducts);
  app.post("/api/auth/crearsugerencia",controller.crearSugerencia);
  app.get("/api/auth/sugerencias",controller.getAllSugerencias);
  app.post("/api/auth/crearPedido",controller.crearPedido);
  app.get("/api/auth/pedidos",controller.getAllPedidos);
  app.post("/api/auth/crearreporte",controller.crearReporte);
  app.get("/api/auth/reporte",controller.getAllReportes);
};
