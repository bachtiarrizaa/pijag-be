import type { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId
      const user = await UserService.getProfile(userId)

      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }
}
