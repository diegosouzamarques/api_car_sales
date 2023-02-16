import express from "express";
import anuncioConroller from "../controllers/anuncioController.js";

const anuncioRoutes = express.Router();

anuncioRoutes
  .get("/anuncios", anuncioConroller.getAnuncios)
  .get("/anuncios/:id", anuncioConroller.getAnuncio)
  .post("/anuncios", anuncioConroller.createAnuncio)
  .patch("/anuncios/:id", anuncioConroller.updateAnuncio)
  .delete("/anuncios/:id", anuncioConroller.deleteAnuncio);
export default anuncioRoutes;
