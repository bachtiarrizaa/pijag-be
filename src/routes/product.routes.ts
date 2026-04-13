import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { UploadImgMiddleware } from '../middlewares/upload.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { RoleNames } from '../constants/role.constants'

const router = Router()

router.post(
  '/',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  UploadImgMiddleware.uploadImgProduct,
  ProductController.create
)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.patch(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  UploadImgMiddleware.uploadImgProduct,
  ProductController.update
)
router.delete(
  '/:id',
  AuthMiddleware.authenticateToken,
  AuthMiddleware.authorizeRole([RoleNames.ADMIN]),
  ProductController.delete
)

export default router
