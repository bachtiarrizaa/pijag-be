import { Router } from "express";
import { isCashier } from "../middleware/authMiddleware";
import {
  endShiftController,
  startShiftController,
} from "../controllers/shift/shiftController";

const router = Router();

router.use(isCashier);

router.post("/shift/start", startShiftController);
router.post("/shift/end", endShiftController)

export default router;