import type { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { validateRequest } from '../utils/validation.utils'
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../validations/auth.validation'

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = registerSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const register = await AuthService.register(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Register successful',
        data: register,
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const login = await AuthService.login(parsed.data)

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: login,
      })
    } catch (error) {
      next(error)
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization
      const accessToken = authHeader && authHeader.split(' ')[1]

      if (!accessToken) {
        return res.status(401).json({
          success: false,
          message: 'AccessToken is required',
        })
      }

      await AuthService.logout(accessToken)

      return res.status(200).json({
        success: true,
        message: 'Logout successful',
      })
    } catch (error) {
      next(error)
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = refreshTokenSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const refreshToken = await AuthService.refreshToken(parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Token refreshed successful',
        data: refreshToken,
      })
    } catch (error) {
      next(error)
    }
  }
}
