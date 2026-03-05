import jwt, { type SignOptions } from 'jsonwebtoken'
import type { StringValue } from 'ms'
import type { JwtPayload } from '../types/config'

const accessTokenOptions: SignOptions = {
  expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as StringValue,
}

const refreshTokenOptions: SignOptions = {
  expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '1d') as StringValue,
}

export class JwtUtils {
  static signAccessToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      accessTokenOptions
    )
  }

  static signRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      refreshTokenOptions
    )
  }

  static verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload
  }

  static verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as JwtPayload
  }
}
