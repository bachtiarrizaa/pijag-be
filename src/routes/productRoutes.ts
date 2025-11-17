import { Router } from "express";
import { createProductController } from "../controllers/product/productController";
import { isAdmin } from "../middleware/authMiddleware";
import { uploadImgProduct } from "../middleware/uploadMiddleware";

const router = Router();

router.post("/", isAdmin, uploadImgProduct, createProductController)

export default router;