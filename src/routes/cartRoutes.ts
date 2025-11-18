import { Router } from "express";
import { isCustomer } from "../middleware/authMiddleware";
import { addItemToCartController, deleteCartItemController, getCartController, updateCartItemController } from "../controllers/cart/cartController";

const router = Router();

router.use(isCustomer);

router.get("/", getCartController);
router.post("/item", addItemToCartController);
router.put("/item/:id", updateCartItemController)
router.delete("/item/:id", deleteCartItemController)

export default router;