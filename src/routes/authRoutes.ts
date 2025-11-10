import { Router } from "express";
import registerController from "../controllers/auth/registerController";

const router = Router();

router.post("/register", registerController);

export default router;