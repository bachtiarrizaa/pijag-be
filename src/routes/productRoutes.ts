import { Router } from "express";
import { createProductController } from "../controllers/product/productController";
import { isAdmin } from "../middleware/authMiddleware";

const router = Router();
router.use(isAdmin);

router.post("/", isAdmin, createProductController)

export default router;