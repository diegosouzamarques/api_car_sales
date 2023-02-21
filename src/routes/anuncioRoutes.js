import express from "express";
import anuncioController from "../controllers/anuncioController.js";
import { checkAnuncio, onlyOneProperties, validationCreateUpdateAnuncio } from "../servico/anuncio/anuncio.validator.js";

const anuncioRoutes = express.Router();

anuncioRoutes
  .get("/anuncios", anuncioController.getAnuncios)
  .get("/anuncios/:id", anuncioController.getAnuncio)
  .post("/anuncios", validationCreateUpdateAnuncio(), checkAnuncio, anuncioController.createAnuncio)
  .patch("/anuncios/:id", onlyOneProperties, validationCreateUpdateAnuncio(true), checkAnuncio, anuncioController.updateAnuncio)
  .delete("/anuncios/:id", anuncioController.deleteAnuncio);
export default anuncioRoutes;
