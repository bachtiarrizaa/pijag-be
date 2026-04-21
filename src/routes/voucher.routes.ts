import { Router } from 'express'
import { VoucherController } from '../controllers/voucher.controller'

const router = Router()

router.post('/', VoucherController.create)
router.get('/', VoucherController.getVouchers)
router.get('/:id', VoucherController.getVoucherById)
router.patch('/:id', VoucherController.update)
router.delete('/:id', VoucherController.delete)

export default router
