import { Router } from 'express'
import authRoutes from './auth.routes'
import profileRoutes from './profile.routes'
import roleROutes from './role.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/profiles', profileRoutes)
router.use('/roles', roleROutes)

export default router
