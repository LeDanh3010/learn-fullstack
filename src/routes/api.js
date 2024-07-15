import express from "express";
import registerController from "../controllers/registerControllers";
import loginController from "../controllers/loginController";
import apiControllers from "../controllers/apiControllers";
import { checkUserPermission, checkUserWithJwt } from "../middleware/jwtConfig";

const api = express.Router();
api.all("*", checkUserWithJwt, checkUserPermission);
//router api
api.post("/v1/register", registerController);
api.post("/v1/login", loginController);

//api CRUD
api.get("/v1/getUser", apiControllers.read);
api.post("/v1/createUser", apiControllers.create);
api.put("/v1/updateUser", apiControllers.update);
api.delete("/v1/deleteUser", apiControllers.destroy);

//api group
api.get("/v1/group/getGroup", apiControllers.getGroup);

//api edit get user
api.get("/v1/edit/getUser", apiControllers.getEdit);

//api for refresh page
api.get("/v1/account", apiControllers.userAccount);

//api for logout
api.get("/v1/logout", apiControllers.logout);

//api create role
api.post("/v1/role/createRole", apiControllers.createRole);

//api show role
api.get("/v1/role/getRole", apiControllers.getRole);

//api delete role
api.delete("/v1/role/deleteRole", apiControllers.deleteRole);

export default api;
