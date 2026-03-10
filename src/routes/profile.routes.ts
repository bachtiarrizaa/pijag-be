import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { UserController } from '../controllers/user.controller'

const router = Router()

router.get('/me', AuthMiddleware.authenticateToken, UserController.getProfile)

export default router
