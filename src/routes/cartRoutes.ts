import { Router } from "express";
import { isCustomer } from "../middleware/authMiddleware";
import { addItemToCartController, getCartController, updateItemController } from "../controllers/cart/cartController";

const router = Router();

router.use(isCustomer);

router.get("/", getCartController);
router.post("/item", addItemToCartController);
router.put("/item/:id", updateItemController)

export default router;