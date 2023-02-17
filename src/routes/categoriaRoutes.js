import express from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = express.Router();

categoriaRoutes
  .get("/categorias", categoriaController.getCategorias)
  .get("/categorias/:id", categoriaController.getCategoria)
  .post("/categorias", categoriaController.createCategoria)
  .patch("/categorias/:id", categoriaController.updateCategoria)
  .delete("/categorias/:id", categoriaController.deleteCategoria);
export default categoriaRoutes;
