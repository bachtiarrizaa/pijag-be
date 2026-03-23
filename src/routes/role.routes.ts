import { Router } from 'express'
import { RoleController } from '../controllers/role.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { RoleNames } from '../constants/role.constants'

const router = Router()

router.post(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  RoleController.create
)
router.get(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  RoleController.getRoles
)
router.put(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  RoleController.update
)
router.delete(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  RoleController.delete
)

export default router
