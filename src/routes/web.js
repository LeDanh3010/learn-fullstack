import express from "express";
import homeController from "../controllers/homePageController";
const router = express.Router();

router.get("/", homeController.home);

export default router;
