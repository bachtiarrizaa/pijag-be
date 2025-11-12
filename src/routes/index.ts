import { Router } from 'express';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import customerRoutes from './customerRoutes';
import categoryRoutes from './categoryRoutes'

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/customer", customerRoutes);
router.use("/category", categoryRoutes);

export default router;