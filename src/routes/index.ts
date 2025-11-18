import { Router } from 'express';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import customerRoutes from './customerRoutes';
import categoryRoutes from './categoryRoutes';
import roleRoutes from './roleRoutes';
import profileRoutes from './profileRoutes';
import productRoutes from "./productRoutes";
import shiftRoutes from "./shiftRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/customer", customerRoutes);
router.use("/category", categoryRoutes);
router.use("/role", roleRoutes)
router.use("/profile", profileRoutes);
router.use("/product", productRoutes);
router.use("/cashier", shiftRoutes)

export default router;