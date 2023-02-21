import express from "express";
import tipoController from "../controllers/tipoController.js";
import { checkIdTipo, checkTipo, validationCreateUpdateTipo } from "../servico/tipo/tipo.validator.js";

const tipoRoutes = express.Router();

tipoRoutes
  .get("/tipos", tipoController.getTipos)
  .get("/tipos/:id", checkIdTipo, checkTipo, tipoController.getTipo)
  .post("/tipos", validationCreateUpdateTipo, checkTipo, tipoController.createTipo)
  .patch("/tipos/:id",  checkIdTipo, validationCreateUpdateTipo, checkTipo, tipoController.updateTipo)
  .delete("/tipos/:id",  checkIdTipo, checkTipo, tipoController.deleteTipo);
export default tipoRoutes;
