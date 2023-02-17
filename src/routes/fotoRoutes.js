import express from "express";
import fotoController from "../controllers/fotoController.js";

const fotoRoutes = express.Router();

fotoRoutes
  .get("/fotos", fotoController.getFotos)
  .get("/fotos/:id", fotoController.getFoto)
  .post("/fotos", fotoController.createFoto)
  .patch("/fotos/:id", fotoController.updateFoto)
  .delete("/fotos/:id", fotoController.deleteFoto);
export default fotoRoutes;
