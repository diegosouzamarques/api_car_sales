import express from "express";
import anuncioRoutes from "./anuncioRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send(' <H1> api car sales from web </H1>');
    });

    app.use(
        express.json(),
        anuncioRoutes
    )
}

export default routes;