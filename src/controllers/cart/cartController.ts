import { Request, Response } from "express";
import { addItemtoCartService, getCartService } from "../../services/cart/cartService";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { Cart } from "../../types/cart";

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

export const addItemToCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.user?.customerId;
    // const userId = req.user?.id;

    // if (!userId) {
    //   return sendError(res, 401, "Unauthorized")
    // }

    const data: Cart = req.body;

    const cartItem = await addItemtoCartService(customerId, data);
    return sendSuccess(res, 201, "Item added to cart successfully", cartItem);
  } catch (error: any) {
    console.error("GetCart Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}