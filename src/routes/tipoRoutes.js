import express from "express";
import tipoController from "../controllers/tipoController.js";
import { checkIdTipo, checkTipo, validationCreateUpdateTipo } from "../servico/tipo/tipo.validator.js";
import { authJwt }from "../authEngine/index.js";

const tipoRoutes = express.Router();

tipoRoutes
  .get("/", authJwt.isModeratorOrAdmin, tipoController.getTipos)
  .get("/id", authJwt.isModeratorOrAdmin, checkIdTipo, checkTipo, tipoController.getTipo)
  .post("/", authJwt.isAdmin, validationCreateUpdateTipo, checkTipo, tipoController.createTipo)
  .patch("/id",  authJwt.isAdmin, checkIdTipo, validationCreateUpdateTipo, checkTipo, tipoController.updateTipo)
  .delete("/id",  authJwt.isAdmin, checkIdTipo, checkTipo, tipoController.deleteTipo);
export default tipoRoutes;
