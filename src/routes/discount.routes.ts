import { Router } from 'express'
import { DiscountController } from '../controllers/discount.controller'

const router = Router()

router.post('/', DiscountController.create)
router.get('/', DiscountController.getDiscounts)
router.get('/:id', DiscountController.getDiscountById)
router.patch('/:id/status', DiscountController.updateStatus)
router.patch('/:id', DiscountController.update)
router.delete('/:id', DiscountController.delete)

export default router
