import  express  from "express";

const app = express();

app.get('/',(req, res) => {
    res.send(' <H1> api car sales from web </H1>');
});

export default app;