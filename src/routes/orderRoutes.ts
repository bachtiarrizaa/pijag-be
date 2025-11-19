import { Router } from "express";
import { authenticateToken, authorizeRole} from "../middleware/authMiddleware";
import { createOrderController } from "../controllers/order/createOrderController";

const router = Router();

router.post(
  "/add", 
  authenticateToken, 
  authorizeRole(["customer", "cashier"]),
  createOrderController
);

export default router;