import express from "express";
import { authJwt }from "../authEngine/index.js";
import anuncioController from "../controllers/anuncioController.js";
import { checkAnuncio, checkIdAnunio, onlyOneProperties, validationCreateUpdateAnuncio } from "../servico/anuncio/anuncio.validator.js";

const anuncioRoutes = express.Router();

anuncioRoutes
  .get("/", authJwt.isModeratorOrAdmin, anuncioController.getAnuncios)
  .get("/:id", authJwt.isModeratorOrAdmin, checkIdAnunio, checkAnuncio, anuncioController.getAnuncio)
  .post("/", authJwt.isModeratorOrAdmin, validationCreateUpdateAnuncio(), checkAnuncio, anuncioController.createAnuncio)
  .patch("/:id", authJwt.isModeratorOrAdmin, checkIdAnunio, onlyOneProperties, validationCreateUpdateAnuncio(true), checkAnuncio, anuncioController.updateAnuncio)
  .delete("/:id", authJwt.isAdmin, checkIdAnunio, checkAnuncio, anuncioController.deleteAnuncio);
export default anuncioRoutes;
