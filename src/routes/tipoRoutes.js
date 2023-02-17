import express from "express";
import tipoController from "../controllers/tipoController.js";

const tipoRoutes = express.Router();

tipoRoutes
  .get("/tipos", tipoController.getTipos)
  .get("/tipos/:id", tipoController.getTipo)
  .post("/tipos", tipoController.createTipo)
  .patch("/tipos/:id", tipoController.updateTipo)
  .delete("/tipos/:id", tipoController.deleteTipo);
export default tipoRoutes;
