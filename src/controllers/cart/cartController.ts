import { Request, Response } from "express";
import { getCartService } from "../../services/cart/cartService";
import { sendError, sendSuccess } from "../../utils/responseHandler";

export const getCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.user?.customerId;
    const getCart = await getCartService(customerId);
    return sendSuccess(res, 200, "Cart fetched successfully", getCart);
  } catch (error: any) {
    console.error("GetCart Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}