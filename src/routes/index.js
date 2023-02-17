import express from "express";
import anuncioRoutes from "./anuncioRoutes.js";
import vendedorRoutes from "./vendedorRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import fotoRoutes from "./fotoRoutes.js";
import tipoRoutes from "./tipoRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send(' <H1> api car sales from web </H1>');
    });

    app.use(
        express.json(),
        anuncioRoutes,
        vendedorRoutes,
        categoriaRoutes,
        fotoRoutes,
        tipoRoutes
    )
}

export default routes;