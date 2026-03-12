import type { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import type { JwtPayload } from 'jsonwebtoken'
import { setPasswordSchema } from '../validations/auth.validation'
import { validateRequest } from '../utils/validation.utils'

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as JwtPayload
      const userId = user?.userId
      const result = await UserService.getProfile(userId)

      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = setPasswordSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const { userId } = req.user as JwtPayload
      await UserService.setPassword(userId, parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Password set successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
