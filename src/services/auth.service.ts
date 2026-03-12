import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import type { LoginDto, RefreshTokenDto, RegisterDto } from '../dtos/auth.dtos'
import { CustomerRepository } from '../repositories/customer.repository'
import { UserRepository } from '../repositories/user.repository'
import { ErrorHandler } from '../utils/error.utils'
import { BlacklistTokenRepository } from '../repositories/blacklist-token.repository'
import type { JwtPayload } from 'jsonwebtoken'
import { JwtUtils } from '../utils/jwt.utils'
import { RoleRepository } from '../repositories/role.repository'
import { CUSTOMER_ROLE_NAME } from '../constants/role.constants'

export class AuthService {
  static async register(registerDto: RegisterDto) {
    const existingUsername = await UserRepository.findByUsername(
      registerDto.username
    )
    if (existingUsername) {
      throw new ErrorHandler(409, 'Username already taken')
    }

    const existingEmail = await UserRepository.findByEmail(registerDto.email)
    if (existingEmail) {
      throw new ErrorHandler(409, 'Email already taken')
    }

    const role = await RoleRepository.findRoleByName(CUSTOMER_ROLE_NAME)
    if (!role) {
      throw new ErrorHandler(404, 'Customer role not found')
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12)

    const user = await UserRepository.create({
      name: registerDto.name,
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      roleId: role.id,
    })
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

    if (!user.password) {
      throw new ErrorHandler(
        401,
        'This account uses Google login. Please login with Google.'
      )
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

    const accessToken = JwtUtils.signAccessToken(payload)
    const refreshToken = JwtUtils.signRefreshToken(payload)

    return {
      accessToken,
      refreshToken,
      // user,
    }
  }

  static async logout(accessToken: string) {
    const decoded = Jwt.decode(accessToken) as JwtPayload | null
    if (!decoded?.exp) {
      throw new ErrorHandler(401, 'Invalid token')
    }

    const expiredAt = new Date(decoded.exp * 1000)
    await BlacklistTokenRepository.create(accessToken, expiredAt)
  }

  static async refreshToken(refreshTokenDto: RefreshTokenDto) {
    let decoded: JwtPayload
    try {
      decoded = JwtUtils.verifyRefreshToken(refreshTokenDto.refreshToken)
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
    const accessToken = JwtUtils.signAccessToken(payload)
    const refreshToken = JwtUtils.signRefreshToken(payload)

    return { accessToken, refreshToken }
  }

  static async googleCallback(
    userId: string,
    roleId: string,
    roleName: string
  ) {
    const payload = { userId, roleId, roleName }

    const accessToken = JwtUtils.signAccessToken(payload)
    const refreshToken = JwtUtils.signRefreshToken(payload)

    return { accessToken, refreshToken }
  }
}
