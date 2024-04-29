import express from "express";
import configViewEngine from "./configs/viewEngines/viewEngine";
import route from "./routes/index";
require("dotenv").config();
import bodyParser from "body-parser";

//define express app
const app = express();
const PORT = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define config view engine
configViewEngine(app);

//define routes app
route(app);

//execute server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
