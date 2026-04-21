import type { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../validations/auth.validation'
import { ErrorHandler } from '../utils/error.utils'
import type { JwtPayload } from '../types/config'
import { ValidationUtils } from '../utils/validation.utils'

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = registerSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
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
        return ValidationUtils.request(res, parsed.error)
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
        return ValidationUtils.request(res, parsed.error)
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

  static async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as JwtPayload | undefined

      if (!payload) {
        throw new ErrorHandler(401, 'Google authentication failde')
      }

      const { accessToken, refreshToken } = await AuthService.googleCallback(
        payload.userId,
        payload.roleId,
        payload.roleName
      )

      const redirectUrl = new URL(`${process.env.FRONTEND_URL}/auth/callback`)
      redirectUrl.searchParams.set('accessToken', accessToken)
      redirectUrl.searchParams.set('refreshToken', refreshToken)

      return res.redirect(redirectUrl.toString())
    } catch (error) {
      console.log('ERROR:', error)
      next(error)
    }
  }
}
