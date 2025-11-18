import { Router } from "express";
import { isCustomer } from "../middleware/authMiddleware";
import { getCartController } from "../controllers/cart/cartController";

const router = Router();

router.use(isCustomer);

router.get("/", getCartController);

export default router;