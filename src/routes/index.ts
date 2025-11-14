import { Router } from 'express';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import customerRoutes from './customerRoutes';
import categoryRoutes from './categoryRoutes';
import roleRoutes from './roleRoutes';
import profileRoutes from './profileRoutes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/customer", customerRoutes);
router.use("/category", categoryRoutes);
router.use("/role", roleRoutes)
router.use("/profile", profileRoutes);

export default router;