import express from "express";
import categoriaController from "../controllers/categoriaController.js";
import { authJwt }from "../authEngine/index.js";
import { checkCategoria, checkIdCategoria, validationCreateUpdateCategoria } from "../servico/categoria/categoria.validator.js";

const categoriaRoutes = express.Router();

categoriaRoutes
  .get("/", authJwt.isModeratorOrAdmin, categoriaController.getCategorias)
  .get("/id", authJwt.isModeratorOrAdmin, checkIdCategoria, checkCategoria, categoriaController.getCategoria)
  .post("/", authJwt.isAdmin, validationCreateUpdateCategoria, checkCategoria, categoriaController.createCategoria)
  .patch("/id", authJwt.isAdmin, checkIdCategoria, validationCreateUpdateCategoria, checkCategoria, categoriaController.updateCategoria)
  .delete("/id", authJwt.isAdmin, checkIdCategoria, checkCategoria , categoriaController.deleteCategoria);
export default categoriaRoutes;
