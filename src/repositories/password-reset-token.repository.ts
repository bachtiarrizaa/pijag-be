import prisma from '../config/db.config'

export class PasswordResetTokenRepository {
  static async create(userId: string, token: string, expiredAt: Date) {
    return prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiredAt,
      },
    })
  }

  static async findByToken(token: string) {
    return prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })
  }

  static async deleteByUserId(userId: string) {
    return prisma.passwordResetToken.deleteMany({
      where: { userId },
    })
  }

  static async deleteByToken(token: string) {
    return prisma.passwordResetToken.delete({
      where: { token },
    })
  }
}
