import "dotenv/config";
import app from './src/app.js'
import ip from "ip";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando em http://${ip.address()}:${port}`)
}); 