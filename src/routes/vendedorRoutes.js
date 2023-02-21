import express from "express";
import vendedorController from "../controllers/vendedorController.js";
import { checkIdVendedor, checkVendedor, validationCreateUpdateVendedor } from "../servico/vendedor/vendedor.validator.js";

const vendedorRoutes = express.Router();

vendedorRoutes
  .get("/vendedores", vendedorController.getVendedores)
  .get("/vendedores/:id", checkIdVendedor, checkVendedor, vendedorController.getVendedor)
  .post("/vendedores", validationCreateUpdateVendedor, checkVendedor, vendedorController.createVendedor)
  .patch("/vendedores/:id", checkIdVendedor, validationCreateUpdateVendedor, checkVendedor, vendedorController.updateVendedor)
  .delete("/vendedores/:id", checkIdVendedor, checkVendedor, vendedorController.deleteVendedor);
export default vendedorRoutes;
