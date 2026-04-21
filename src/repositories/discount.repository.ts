import prisma from '../config/db.config'
import type {
  CreateDiscountDto,
  UpdateDiscountDto,
  UpdateStatusDiscountDto,
} from '../dtos/discount.dtos'

export class DiscountRepository {
  static async create(dto: CreateDiscountDto) {
    return prisma.discount.create({
      data: dto,
    })
  }

  static async findByName(name: string) {
    return prisma.discount.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    })
  }

  static async findById(discountId: string) {
    return prisma.discount.findUnique({
      where: { id: discountId },
    })
  }

  static async findDiscounts() {
    return prisma.discount.findMany()
  }

  static async updateStatus(discountId: string, dto: UpdateStatusDiscountDto) {
    return prisma.discount.update({
      where: { id: discountId },
      data: { isActive: dto.isActive },
    })
  }

  static async update(discountId: string, dto: UpdateDiscountDto) {
    return prisma.discount.update({
      where: { id: discountId },
      data: dto,
    })
  }

  static async delete(discountId: string) {
    return prisma.discount.delete({
      where: { id: discountId },
    })
  }
}
