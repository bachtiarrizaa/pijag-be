import prisma from '../config/db.config'

export class BlacklistTokenRepository {
  static async create(token: string, expiredAt: Date) {
    return prisma.blacklistToken.create({
      data: {
        token,
        expiredAt,
      },
    })
  }

  static async findBlacklistToken(token: string) {
    return prisma.blacklistToken.findFirst({
      where: { token },
    })
  }
}
