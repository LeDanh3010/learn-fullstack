import express from "express";
import configViewEngine from "./config/viewEngines/viewEngine";
import route from "./routes/index";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

//define config view engine
configViewEngine(app);

//define routes app
route(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
