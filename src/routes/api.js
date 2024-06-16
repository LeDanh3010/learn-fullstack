import express from "express";
import registerController from "../controllers/registerControllers";
import loginController from "../controllers/loginController";
import apiControllers from "../controllers/apiControllers";

const api = express.Router();

//router api
api.post("/v1/register", registerController);
api.post("/v1/login", loginController);
//api CRUD
api.get("/v1/getUser", apiControllers.read);
api.post("/v1/createUser", apiControllers.create);
api.put("/v1/updateUser", apiControllers.update);
api.delete("/v1/deleteUser", apiControllers.destroy);

api.get("/v1/group/getUser", apiControllers.getGroup);
export default api;
