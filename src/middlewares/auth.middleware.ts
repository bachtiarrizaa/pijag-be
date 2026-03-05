import type { NextFunction, Request, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { ErrorHandler } from '../utils/error.utils'
import { BlacklistTokenRepository } from '../repositories/blacklist-token.repository'
import { verifyAccessToken } from '../utils/jwt.utils'

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
        decoded = verifyAccessToken(token)
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
}
