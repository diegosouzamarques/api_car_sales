import express from "express";
import { authJwt }from "../authEngine/index.js";
import vendedorController from "../controllers/vendedorController.js";
import { checkIdVendedor, checkVendedor, validationCreateUpdateVendedor } from "../servico/vendedor/vendedor.validator.js";

const vendedorRoutes = express.Router();

vendedorRoutes
  .get("/", authJwt.isModeratorOrAdmin, vendedorController.getVendedores)
  .get("/:id", authJwt.isModeratorOrAdmin, checkIdVendedor, checkVendedor, vendedorController.getVendedor)
  .post("/", authJwt.isAdmin, validationCreateUpdateVendedor, checkVendedor, vendedorController.createVendedor)
  .patch("/:id", authJwt.isAdmin, checkIdVendedor, validationCreateUpdateVendedor, checkVendedor, vendedorController.updateVendedor)
  .delete("/:id", authJwt.isAdmin, checkIdVendedor, checkVendedor, vendedorController.deleteVendedor);
export default vendedorRoutes;
