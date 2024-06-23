import express from "express";
import configViewEngine from "./config/viewEngines/viewEngine";
import route from "./routes/index";
import connectToDatabase from "./config/DB";
import Cors from "./config/CORS";
import cookieParser from "cookie-parser";

require("dotenv").config();

//define express app
const app = express();
const PORT = process.env.PORT || 8080;

//COrs
Cors(app);

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use cookie
app.use(cookieParser());

//define config view engine
configViewEngine(app);

//authenticate
connectToDatabase();

//define routes app
route(app);
app.use((req, res) => {
  return res.send("404 not found");
});
//execute server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
