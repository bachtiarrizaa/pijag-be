import { Request, Response } from "express";
import { addItemtoCartService, deleteCartItemService, getCartService, updateCartItemService } from "../../services/cart/cartService";
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

    const data: Cart = req.body;

    const cartItem = await addItemtoCartService(customerId, data);
    return sendSuccess(res, 201, "Item added to cart successfully", cartItem);
  } catch (error: any) {
    console.error("GetCart Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};

export const updateCartItemController = async (req:Request, res: Response): Promise<void> => {
  try {
    const cartItemId = Number(req.params.id);

    if (isNaN(cartItemId)) {
      return sendError(res, 400, "Invalid cart item ID");
    }

    const data: Cart = req.body;

    const updateItem = await updateCartItemService(cartItemId, data);
    
    if ("message" in updateItem && updateItem.message === "Item removed from cart") {
      return sendSuccess(res, 200, "Item removed from cart", null);
    }
    return sendSuccess(res, 201, "Item added to cart successfully", updateItem);
  } catch (error: any) {
    console.error("GetCart Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};

export const deleteCartItemController = async(req:Request, res:Response): Promise<void> => {
  try {
    const cartItemId = Number(req.params.id);

    if (isNaN(cartItemId)) {
      return sendError(res, 400, "Invalid cart item ID");
    }

    const deleteItem = await deleteCartItemService(cartItemId);
    return sendSuccess(res, 200, "Cart item, deleted successfully", deleteItem);
  } catch (error: any) {
    console.error("GetCart Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}