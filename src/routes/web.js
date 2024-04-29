import express from "express";
import homeController from "../controllers/homePageController";
const router = express.Router();

router.post("/users/create-user", homeController.create);
router.get("/users", homeController.user);
router.get("/", homeController.home);

export default router;
