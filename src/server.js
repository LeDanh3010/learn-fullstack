import express from "express";
import configViewEngine from "./config/viewEngines/viewEngine";
import route from "./routes/index";
import connectToDatabase from "./config/DB";
import Cors from "./config/CORS";

require("dotenv").config();

//define express app
const app = express();
const PORT = process.env.PORT || 8080;

//COrs
Cors(app);

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define config view engine
configViewEngine(app);

//authenticate
connectToDatabase();

//define routes app
route(app);

//execute server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
