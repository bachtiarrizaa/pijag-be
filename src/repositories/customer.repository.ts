import prisma from '../config/db.config'

export class CustomerRepository {
  static async create(userId: string) {
    return prisma.customer.create({
      data: {
        userId: userId,
        points: 0,
      },
    })
  }
}
