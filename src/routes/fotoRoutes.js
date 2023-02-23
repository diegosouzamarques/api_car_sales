import express from "express";
import fotoController from "../controllers/fotoController.js";
import { checkFoto, checkIdFoto, onlyOneProperties, validationCreateUpdateFoto } from "../servico/foto/foto.validator.js";
import { authJwt }from "../authEngine/index.js";

const fotoRoutes = express.Router();

fotoRoutes
  .get("/", authJwt.isModeratorOrAdmin, fotoController.getFotos)
  .get("/:id", authJwt.isModeratorOrAdmin, checkIdFoto, checkFoto, fotoController.getFoto)
  .post("/", authJwt.isAdmin, validationCreateUpdateFoto(), checkFoto,fotoController.createFoto)
  .patch("/:id",  authJwt.isAdmin, checkIdFoto, onlyOneProperties, validationCreateUpdateFoto(true), checkFoto, fotoController.updateFoto)
  .delete("/:id",  authJwt.isAdmin, checkIdFoto, checkFoto, fotoController.deleteFoto);
export default fotoRoutes;
