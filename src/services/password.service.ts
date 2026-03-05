import bcrypt from 'bcryptjs'
import type { ForgotPasswordDto, ResetPasswordDto } from '../dtos/auth.dtos'
import { PasswordResetTokenRepository } from '../repositories/password-reset-token.repository'
import { UserRepository } from '../repositories/user.repository'
import { ErrorHandler } from '../utils/error.utils'
import { MailerUtils } from '../utils/mail.utils'

const OTP_EXPIRES = 5

export class PasswordService {
  static async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await UserRepository.findByEmail(forgotPasswordDto.email)
    if (!user) return

    await PasswordResetTokenRepository.deleteByUserId(user.id)

    const otp = MailerUtils.generateOtp()
    const expiredat = new Date(Date.now() + OTP_EXPIRES * 60 * 1000)

    await PasswordResetTokenRepository.create(user.id, otp, expiredat)

    await MailerUtils.sendOtpEmail(user.email, user.name, otp)
  }

  static async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetToken = await PasswordResetTokenRepository.findByToken(
      resetPasswordDto.otp
    )
    if (!resetToken) {
      throw new ErrorHandler(400, 'Invalid OTP')
    }

    if (resetToken.expiredAt < new Date()) {
      await PasswordResetTokenRepository.deleteByToken(resetPasswordDto.otp)
      throw new ErrorHandler(400, 'OTP has expired')
    }

    if (resetToken.user.email !== resetPasswordDto.email) {
      throw new ErrorHandler(400, 'Invalid OTP')
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 12)
    await UserRepository.updatePassword(resetToken.userId, hashedPassword)

    await PasswordResetTokenRepository.deleteByToken(resetPasswordDto.otp)
  }
}
