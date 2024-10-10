import express from 'express'
import { config } from 'dotenv'

config()
import routes from "./routes/index.routes.js";

const serverPort = process.env.PORT || 4000

const app = express();
app.use(express.json());
app.use(routes);

app.listen(serverPort, () => {
    console.log(`😎 Server iniciado em http://localhost:${serverPort}`)
})