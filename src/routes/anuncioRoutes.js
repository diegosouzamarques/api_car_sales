import express from "express";
import anuncioController from "../controllers/anuncioController.js";
import { checkAnuncio, checkIdAnunio, onlyOneProperties, validationCreateUpdateAnuncio } from "../servico/anuncio/anuncio.validator.js";

const anuncioRoutes = express.Router();

anuncioRoutes
  .get("/anuncios", anuncioController.getAnuncios)
  .get("/anuncios/:id", checkIdAnunio, checkAnuncio, anuncioController.getAnuncio)
  .post("/anuncios", validationCreateUpdateAnuncio(), checkAnuncio, anuncioController.createAnuncio)
  .patch("/anuncios/:id", checkIdAnunio, onlyOneProperties, validationCreateUpdateAnuncio(true), checkAnuncio, anuncioController.updateAnuncio)
  .delete("/anuncios/:id", checkIdAnunio, checkAnuncio, anuncioController.deleteAnuncio);
export default anuncioRoutes;
