import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { RoleNames } from '../constants/role.constants'
import { CategoryController } from '../controllers/category.controller'

const router = Router()

router.post(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  CategoryController.create
)
router.get(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  CategoryController.getCategories
)
router.get(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  CategoryController.getCategoryById
)
router.put(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  CategoryController.update
)
router.delete(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  CategoryController.delete
)

export default router
