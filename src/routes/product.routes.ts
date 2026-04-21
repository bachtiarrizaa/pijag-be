import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { UploadImgMiddleware } from '../middlewares/upload.middleware'

const router = Router()

router.post('/', UploadImgMiddleware.uploadImgProduct, ProductController.create)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.patch(
  '/:id',
  UploadImgMiddleware.uploadImgProduct,
  ProductController.update
)
router.patch('/:id/status', ProductController.updateStatus)
router.delete('/:id', ProductController.delete)

export default router
