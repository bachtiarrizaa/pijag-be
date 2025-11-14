import { Router } from "express";
import { updatedUserController } from "../controllers/profile/profileController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.put("/update", authenticateToken, updatedUserController);

export default router;
