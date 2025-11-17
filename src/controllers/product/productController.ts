import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/responseHandler";
import { createProductService, deleteProductService, getAllProductService, getProductByIdService, updateProductService } from "../../services/product/productService";
import { updateProduct } from "../../types/product";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    if(req.file) {
      reqBody.image = req.file?.filename
    }

    const product = await createProductService(reqBody);
    return sendSuccess(res, 201, "Product created successfully", product);
  } catch (error: any) {
    console.error("ProductCreate Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}

export const getAllProductController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductService();
    return sendSuccess(res, 200, "All Product fetched successfully", products);
  } catch (error: any) {
    console.error("GetAllProducts Erro: ", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}

export const getProductbyIdController = async (req: Request, res:Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendError(res, 400, "Product Id is required");
    }

    const productId = parseInt(id, 10);
    if(isNaN(productId)) {
      return sendError(res, 400, "Product Id must be number");
    }

    const product = await getProductByIdService(productId);
    return sendSuccess(res, 200, "Product fetched successfully", product);
  } catch (error: any) {
    console.error("GetProductById Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, "Product Id is required");
    }

    const productId = parseInt(id, 10);
    if(isNaN(productId)) {
      return sendError(res, 400, "Product Id must be number");
    }

    const data: updateProduct = { ...req.body };

    if (req.file) {
      data.image = req.file.filename;
    }

    const updated = await updateProductService(productId, data);
    return sendSuccess(res, 200, "Product updated successfully", updated);
  } catch (error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(res, 400, "Product Id is required");
    }

    const productId = parseInt(id, 10);
    if(isNaN(productId)) {
      return sendError(res, 400, "Product Id must be number");
    }

    const product = await deleteProductService(productId);
    return sendSuccess(res, 200, "Category deleted successfully", product);
  } catch (error: any) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};