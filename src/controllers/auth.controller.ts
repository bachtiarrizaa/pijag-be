import type { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { validateRequest } from '../utils/validation.utils'
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../validations/auth.validation'
// import { ErrorHandler } from '../utils/error.utils'
import { UserRepository } from '../repositories/user.repository'
// import type { JwtPayload } from 'jsonwebtoken'
import { JwtUtils } from '../utils/jwt.utils'
import { ErrorHandler } from '../utils/error.utils'

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

  static async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('googleCallback called')
      console.log('req.user:', req.user)

      const rawUser = req.user as { id: string } | undefined
      console.log('rawUser:', rawUser)

      if (!rawUser) throw new ErrorHandler(401, 'Google authentication failed')

      const user = await UserRepository.findById(rawUser.id)
      console.log('user:', user)

      if (!user) throw new ErrorHandler(401, 'User not found')

      const payload = {
        userId: user.id,
        roleId: user.role.id,
        roleName: user.role.name,
      }

      const accessToken = JwtUtils.signAccessToken(payload)
      const refreshToken = JwtUtils.signRefreshToken(payload)

      const redirectUrl = new URL(`${process.env.FRONTEND_URL}/auth/callback`)
      redirectUrl.searchParams.set('accessToken', accessToken)
      redirectUrl.searchParams.set('refreshToken', refreshToken)

      console.log('redirectUrl:', redirectUrl.toString())

      return res.redirect(redirectUrl.toString())
    } catch (error) {
      console.log('ERROR:', error)
      next(error)
    }
  }
}
