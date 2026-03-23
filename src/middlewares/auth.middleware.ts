import type { NextFunction, Request, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { ErrorHandler } from '../utils/error.utils'
import { BlacklistTokenRepository } from '../repositories/blacklist-token.repository'
import { JwtUtils } from '../utils/jwt.utils'
import type { JwtPayload } from '../types/config'

export class AuthMiddleware {
  static async authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader?.startsWith('Bearer ')) {
        throw new ErrorHandler(401, 'Unauthorized: No token provided')
      }

      const token = authHeader.split(' ')[1]
      if (!token) {
        throw new ErrorHandler(401, 'Unauthorized: Token missing')
      }

      const isBlacklisted =
        await BlacklistTokenRepository.findBlacklistToken(token)
      if (isBlacklisted) {
        throw new ErrorHandler(401, 'Token has been revoked')
      }

      let decoded
      try {
        decoded = JwtUtils.verifyAccessToken(token)
      } catch (error) {
        if (error instanceof Jwt.TokenExpiredError) {
          throw new ErrorHandler(401, 'Access token expired')
        } else {
          throw new ErrorHandler(401, 'Invalid access token')
        }
      }

      req.user = decoded

      next()
    } catch (error) {
      next(error)
    }
  }

  static authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const user = req.user as JwtPayload
        console.log('User dari req: ', user)

        if (!user) {
          throw new ErrorHandler(403, 'Forbidden: No user data')
        }

        if (!user.roleName) {
          throw new ErrorHandler(403, 'Forbidden: Role not found in token')
        }

        const userRole = user.roleName.toLowerCase()
        if (!allowedRoles.includes(userRole)) {
          throw new ErrorHandler(403, 'Forbidden: Access denied')
        }

        next()
      } catch (error) {
        next(error)
      }
    }
  }
}
