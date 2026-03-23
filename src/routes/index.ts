import { Router } from 'express'
import authRoutes from './auth.routes'
import profileRoutes from './profile.routes'
import roleRoutes from './role.routes'
import categoryRoutes from './category.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/profiles', profileRoutes)
router.use('/roles', roleRoutes)
router.use('/categories', categoryRoutes)

export default router
