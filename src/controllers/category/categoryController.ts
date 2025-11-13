import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/responseHandler";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../../services/category/categoryService";

export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      return sendError(res, 400, "Category name is required");
    }

    const category = await createCategoryService(req.body);
    return sendSuccess(res, 201, "Category created successfully", category);
  } catch (error: any) {
    console.error("CreateCategory Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}

export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategoriesService();
    return sendSuccess(res, 200, "Categories fetched successfully", categories);
  } catch (error:any) {
    console.error("GetAllCategories error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}

export const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendError(res, 400, "Category ID is required");
    }

    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return sendError(res, 400, "Category ID must be a number");
    }

    const category = await getCategoryByIdService(categoryId);
    return sendSuccess(res, 200, "Category fetched successfully", category);
  } catch (error: any) {
    console.error("GetCategoryByIdController Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};

export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !id) {
      return sendError(res, 400, "Category name and id is required");
    }

    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return sendError(res, 400, "Invalid category ID")
    };

    const updated = await updateCategoryService({ id: categoryId, name });

    return sendSuccess(res, 200, "Category updated successfully", updated);
  } catch (error: any) {
    console.error("UpdateCategory Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};


export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, "Category ID is required");
    }

    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      return sendError(res, 400, "Category ID must be a number");
    }

    const category = await deleteCategoryService(categoryId);
    return sendSuccess(res, 200, "Category deleted successfully", category);
  } catch (error: any) {
    console.error("DeleteCategory Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};