import express from "express"
import {  isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.use(isAdmin);

router.get("/dashboard", (req, res) => {
  const user = (req as any).user;
  res.json({
    message: `Welcome to Admin Dashboard, ${user.username}`
  });
})

export default router;