import express from "express";
import { isAdmin } from "../middleware/authMiddleware";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  updateRoleController
} from "../controllers/role/roleController";

const router = express.Router();

router.use(isAdmin);

router.post("/", createRoleController);
router.get("/", getAllRoleController);
router.put("/:id", updateRoleController);
router.delete("/:id", deleteRoleController);

export default router;