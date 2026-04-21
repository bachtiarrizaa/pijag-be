import prisma from '../config/db.config'
import type {
  CreateProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
} from '../dtos/product.dtos'

export class ProductRepository {
  static async create(dto: CreateProductDto) {
    return prisma.product.create({
      data: dto,
    })
  }

  static async findByName(name: string) {
    return prisma.product.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
      },
    })
  }

  static async findProducts() {
    return prisma.product.findMany({
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    })
  }

  static async findById(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: { select: { id: true, name: true } },
      },
    })
  }

  static async update(productId: string, dto: UpdateProductDto) {
    return prisma.product.update({
      where: { id: productId },
      data: dto,
    })
  }

  static async updateStatus(productId: string, dto: UpdateStatusProductDto) {
    return prisma.product.update({
      where: { id: productId },
      data: { isActive: dto.isActive },
    })
  }

  static async delete(productId: string) {
    return prisma.product.delete({
      where: { id: productId },
    })
  }
}
