import type { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import type { JwtPayload } from 'jsonwebtoken'

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
}
