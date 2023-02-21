import express from "express";
import fotoController from "../controllers/fotoController.js";
import { checkFoto, checkIdFoto, onlyOneProperties, validationCreateUpdateFoto } from "../servico/foto/foto.validator.js";

const fotoRoutes = express.Router();

fotoRoutes
  .get("/fotos", fotoController.getFotos)
  .get("/fotos/:id", checkIdFoto, checkFoto, fotoController.getFoto)
  .post("/fotos", validationCreateUpdateFoto(), checkFoto,fotoController.createFoto)
  .patch("/fotos/:id",  checkIdFoto, onlyOneProperties, validationCreateUpdateFoto(true), checkFoto, fotoController.updateFoto)
  .delete("/fotos/:id",  checkIdFoto, checkFoto, fotoController.deleteFoto);
export default fotoRoutes;
