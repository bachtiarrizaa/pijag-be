import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/responseHandler";
import { createProductService } from "../../services/product/productService";

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