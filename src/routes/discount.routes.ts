import { Router } from 'express'
import { DiscountController } from '../controllers/discount.controller'

const router = Router()

router.post('/', DiscountController.create)
router.get('/', DiscountController.getDiscounts)
router.get('/:id', DiscountController.getDiscountById)
router.put('/:id', DiscountController.update)
router.delete('/:id', DiscountController.delete)

export default router
