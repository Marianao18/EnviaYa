import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/register", AuthController.register);
router.get("/verify/:token", AuthController.verify);
router.post("/login", AuthController.login);

export default router;

