import express from "express"
import {  isAdmin } from "../middleware/authMiddleware";
import {
    createCategoryController,
    getCategoryByIdController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController,
 } from "../controllers/category/categoryController";

const router = express.Router();

router.use(isAdmin);

router.post("/create", isAdmin, createCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", isAdmin, updateCategoryController);
router.delete("/:id", isAdmin, deleteCategoryController);

export default router;