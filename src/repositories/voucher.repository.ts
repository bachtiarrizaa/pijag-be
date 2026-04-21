import prisma from '../config/db.config'
import type { CreateVoucherDto, UpdateVoucherDto } from '../dtos/voucher.dtos'

export class VoucherRepository {
  static async findVouchers() {
    return prisma.voucher.findMany()
  }

  static async findById(voucherId: string) {
    return prisma.voucher.findUnique({
      where: { id: voucherId },
    })
  }

  static async findByCode(code: string) {
    return prisma.voucher.findFirst({
      where: { code: { equals: code, mode: 'insensitive' } },
    })
  }

  static async findByName(name: string) {
    return prisma.voucher.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    })
  }

  static async create(dto: CreateVoucherDto) {
    return prisma.voucher.create({
      data: dto,
    })
  }

  static async update(voucherId: string, dto: UpdateVoucherDto) {
    return prisma.voucher.update({
      where: { id: voucherId },
      data: dto,
    })
  }

  static async delete(voucherId: string) {
    return prisma.voucher.delete({
      where: { id: voucherId },
    })
  }
}
