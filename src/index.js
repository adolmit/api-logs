import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerApi from "./routes/index.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

routerApi(app);

app.listen(port, () => {
  console.log("server is listening on port " + port);
});
