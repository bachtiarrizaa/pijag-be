import type { NextFunction, Request, Response } from 'express'
import { ValidationUtils } from '../utils/validation.utils'
import { RoleService } from '../services/role.service'
import { roleSchema } from '../validations/role.valisation'
// import { ErrorHandler } from '../utils/error.utils'

export class RoleController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = roleSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const role = await RoleService.create(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Role created successful',
        data: role,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await RoleService.getRoles()
      return res.status(200).json({
        success: true,
        message: 'All roles fetched successful',
        data: roles,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = String(req.params.id)

      const parsed = roleSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const role = await RoleService.update(roleId, parsed.data)

      return res.status(200).json({
        success: true,
        message: 'Role updated successful',
        data: role,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = String(req.params.id)

      await RoleService.delete(roleId)
      return res.status(200).json({
        success: true,
        message: 'Role deleted successful',
      })
    } catch (error) {
      next(error)
    }
  }
}
