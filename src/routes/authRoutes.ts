import express from "express";
import { loginController } from "../controllers/auth/loginController";
import { logoutController } from "../controllers/auth/logoutController";
import { authenticateToken } from "../middleware/authMiddleware";
import { registerController } from "../controllers/auth/registerController";

const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController);
router.post("/logout", authenticateToken, logoutController);

export default router;
