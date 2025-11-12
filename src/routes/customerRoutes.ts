import express from "express";
import { isCustomer } from "../middleware/authMiddleware";

const router = express.Router();

router.use(isCustomer);

router.get("/profile", (req, res) => {
  const user = (req as any).user;
  res.json({
    message: `Welcome to Pijag Coffee ${user.username}`
  });
})

export default router;