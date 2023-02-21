import express from "express";
import anuncioController from "../controllers/anuncioController.js";

const anuncioRoutes = express.Router();

anuncioRoutes
  .get("/anuncios", anuncioController.getAnuncios)
  .get("/anuncios/:id", anuncioController.getAnuncio)
  .post("/anuncios", anuncioController.createAnuncio)
  .patch("/anuncios/:id", anuncioController.updateAnuncio)
  .delete("/anuncios/:id", anuncioController.deleteAnuncio);
export default anuncioRoutes;
