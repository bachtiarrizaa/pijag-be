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
}
