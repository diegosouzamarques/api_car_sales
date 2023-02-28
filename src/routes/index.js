import anuncioRoutes from "./anuncioRoutes.js";
import vendedorRoutes from "./vendedorRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import fotoRoutes from "./fotoRoutes.js";
import tipoRoutes from "./tipoRoutes.js";
import authRoutes from "./auth/auth.routes.js";
import {authJwt}from "../authEngine/index.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.send(" <marquee><H1> api car sales from web </H1></marquee>");
  });

  app.use("/auth", authRoutes);
  app.use("/anuncios", authJwt.verifyToken, anuncioRoutes);
  app.use("/vendedores", authJwt.verifyToken, vendedorRoutes);
  app.use("/categorias", authJwt.verifyToken, categoriaRoutes);
  app.use("/fotos", authJwt.verifyToken, fotoRoutes);
  app.use("/tipos", authJwt.verifyToken, tipoRoutes);
};

export default routes;
