import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { PasswordController } from '../controllers/password.controller'

const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthMiddleware.authenticateToken, AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)
router.post('/forgot-password', PasswordController.forgotPassword)
router.post('/reset-password', PasswordController.resetPassword)

export default router
