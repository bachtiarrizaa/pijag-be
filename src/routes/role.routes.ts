import { Router } from 'express'
import { RoleController } from '../controllers/role.controller'

const router = Router()

router.post('/', RoleController.create)
router.get('/', RoleController.getRoles)
router.put('/:id', RoleController.update)
router.delete('/:id', RoleController.delete)

export default router
