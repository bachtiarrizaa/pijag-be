import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import type { LoginDto, RefreshTokenDto, RegisterDto } from '../dtos/auth.dtos'
import { CustomerRepository } from '../repositories/customer.repository'
import { UserRepository } from '../repositories/user.repository'
import { ErrorHandler } from '../utils/error.utils'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.utils'
import { BlacklistTokenRepository } from '../repositories/blacklist-token.repository'
import type { JwtPayload } from 'jsonwebtoken'

const CUSTOMER_ROLE_NAME = 'customer'

export class AuthService {
  static async register(registerDto: RegisterDto) {
    const existingUsername = await UserRepository.findUsername(
      registerDto.username
    )
    if (existingUsername) {
      throw new ErrorHandler(409, 'Username already taken')
    }

    const existingEmail = await UserRepository.findEmail(registerDto.email)
    if (existingEmail) {
      throw new ErrorHandler(409, 'Email already taken')
    }

    const user = await UserRepository.create(registerDto)
    if (user.role?.name === CUSTOMER_ROLE_NAME) {
      await CustomerRepository.create(user.id)
    }

    return user
  }

  static async login(loginDto: LoginDto) {
    const user = await UserRepository.findEmailWithPassword(loginDto.email)
    if (!user) {
      throw new ErrorHandler(401, 'Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    )
    if (!isPasswordValid) {
      throw new ErrorHandler(401, 'Invalid email or password')
    }

    const payload = {
      userId: user.id,
      roleId: user.role.id,
      roleName: user.role.name,
    }

    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    return {
      accessToken,
      refreshToken,
      // user,
    }
  }

  static async logout(accessToken: string) {
    const decoded = Jwt.decode(accessToken) as JwtPayload | null
    if (!decoded?.exp) throw new ErrorHandler(401, 'Invalid token')

    const expiredAt = new Date(decoded.exp * 1000)
    await BlacklistTokenRepository.create(accessToken, expiredAt)
  }

  static async refreshToken(refreshTokenDto: RefreshTokenDto) {
    let decoded: JwtPayload
    try {
      decoded = verifyRefreshToken(refreshTokenDto.refreshToken)
    } catch (error) {
      console.log('JWT Error:', error)
      if (error instanceof Jwt.TokenExpiredError) {
        throw new ErrorHandler(401, 'Refresh token expired, please login again')
      } else {
        throw new ErrorHandler(401, 'Invalid refresh token')
      }
    }

    const user = await UserRepository.findById(decoded.userId)
    if (!user) {
      throw new ErrorHandler(401, 'User not found')
    }

    const payload = {
      userId: user.id,
      roleId: user.role.id,
      roleName: user.role.name,
    }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    return { accessToken, refreshToken }
  }
}
