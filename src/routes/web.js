import express from "express";
import homeController from "../controllers/homePageController";
const router = express.Router();

router.post("/delete-user/:id", homeController.delete);
router.post("/users/create-user", homeController.create);
router.post("/users/update/:id", homeController.update);
router.get("/users/update-user/:id", homeController.showUpdate);
router.get("/users", homeController.user);
router.get("/", homeController.home);

export default router;
