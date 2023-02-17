import express from "express";
import vendedorController from "../controllers/vendedorController.js";

const vendedorRoutes = express.Router();

vendedorRoutes
  .get("/vendedores", vendedorController.getVendedores)
  .get("/vendedores/:id", vendedorController.getVendedor)
  .post("/vendedores", vendedorController.createVendedor)
  .patch("/vendedores/:id", vendedorController.updateVendedor)
  .delete("/vendedores/:id", vendedorController.deleteVendedor);
export default vendedorRoutes;
