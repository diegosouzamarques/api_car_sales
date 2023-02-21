import express from "express";
import categoriaController from "../controllers/categoriaController.js";
import { checkCategoria, checkIdCategoria, validationCreateUpdateCategoria } from "../servico/categoria/categoria.validator.js";

const categoriaRoutes = express.Router();

categoriaRoutes
  .get("/categorias", categoriaController.getCategorias)
  .get("/categorias/:id", checkIdCategoria, checkCategoria, categoriaController.getCategoria)
  .post("/categorias", validationCreateUpdateCategoria, checkCategoria, categoriaController.createCategoria)
  .patch("/categorias/:id", checkIdCategoria, validationCreateUpdateCategoria, checkCategoria, categoriaController.updateCategoria)
  .delete("/categorias/:id", checkIdCategoria, checkCategoria , categoriaController.deleteCategoria);
export default categoriaRoutes;
