import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { UserController } from '../controllers/user.controller'

const router = Router()

router.get('/me', AuthMiddleware.authenticateToken, UserController.getProfile)
router.post(
  '/set-password',
  AuthMiddleware.authenticateToken,
  UserController.setPassword
)

export default router
