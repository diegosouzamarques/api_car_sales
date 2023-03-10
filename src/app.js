import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.js"

db.on("error", console.log.bind(console, "Erro de conexão"));

db.once("open", () => {
  console.log("conexão com banco feita com sucesso");
});

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
