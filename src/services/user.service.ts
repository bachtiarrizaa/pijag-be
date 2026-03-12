import bcrypt from 'bcryptjs'
import type { SetPasswordDto } from '../dtos/auth.dtos'
import { UserRepository } from '../repositories/user.repository'
import { ErrorHandler } from '../utils/error.utils'

export class UserService {
  static async getProfile(userId: string) {
    const user = await UserRepository.findById(userId)

    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }

    return user
  }

  static async setPassword(userId: string, setPasswordDto: SetPasswordDto) {
    const user = await UserRepository.findUserWithPassword(userId)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }

    if (user.password) {
      throw new ErrorHandler(
        400,
        'Password already set. Use forgot password to change it.'
      )
    }

    const hashedPassword = await bcrypt.hash(setPasswordDto.password, 12)
    await UserRepository.updatePassword(userId, hashedPassword)
  }
}
