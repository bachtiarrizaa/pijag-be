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

router.post("/", isAdmin, createRoleController);
router.get("/", isAdmin, getAllRoleController);
router.put("/:id", isAdmin, updateRoleController);
router.delete("/:id", isAdmin, deleteRoleController);

export default router;