import { Router } from "express";
import { updatedUserController } from "../controllers/profile/profileController";
import { authenticateToken } from "../middleware/authMiddleware";
import { uploadAvatar } from "../middleware/uploadMiddleware";

const router = Router();

router.put("/update", authenticateToken, uploadAvatar, updatedUserController);

export default router;
