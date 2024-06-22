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
api.put("/v1/updateUser/:id", apiControllers.update);
api.delete("/v1/deleteUser", apiControllers.destroy);

//api group
api.get("/v1/group/getUser", apiControllers.getGroup);

//api edit get user
api.get("/v1/edit/getUser/:id", apiControllers.getEdit);

export default api;
