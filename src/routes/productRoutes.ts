import { Router } from "express";
import { createProductController, deleteProductController, getAllProductController, getProductbyIdController, updateProductController } from "../controllers/product/productController";
import { isAdmin } from "../middleware/authMiddleware";
import { uploadImgProduct } from "../middleware/uploadMiddleware";

const router = Router();

router.post("/", isAdmin, uploadImgProduct, createProductController)
router.get("/", getAllProductController);
router.get("/:id", getProductbyIdController);
router.put("/:id", isAdmin, uploadImgProduct, updateProductController);
router.delete("/:id", isAdmin, deleteProductController);

export default router;