import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
//import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection
//connection();

configViewEngine(app);
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>>JWT Backend is runing Port:" + PORT);
});
