import type {
  CreateVoucherDto,
  UpdateStatusVoucherDto,
  UpdateVoucherDto,
} from '../dtos/voucher.dtos'
import { VoucherRepository } from '../repositories/voucher.repository'
import { ErrorHandler } from '../utils/error.utils'

export class VoucherService {
  static async getVouchers() {
    const vouchers = await VoucherRepository.findVouchers()
    return vouchers
  }

  static async getVoucherById(voucherId: string) {
    const voucher = await VoucherRepository.findById(voucherId)
    if (!voucher) {
      throw new ErrorHandler(404, 'Voucher not found')
    }
    return voucher
  }

  static async create(dto: CreateVoucherDto) {
    const existingName = await VoucherRepository.findByName(dto.name)
    if (existingName) {
      throw new ErrorHandler(409, 'Voucher name already exists')
    }

    const existingCode = await VoucherRepository.findByCode(dto.code)
    if (existingCode) {
      throw new ErrorHandler(409, 'Voucher code already exists')
    }

    return VoucherRepository.create(dto)
  }

  static async update(voucherId: string, voucherDto: UpdateVoucherDto) {
    const findVoucher = await VoucherRepository.findById(voucherId)
    if (!findVoucher) {
      throw new ErrorHandler(404, 'Voucher not found')
    }

    if (voucherDto.name) {
      const existingName = await VoucherRepository.findByName(voucherDto.name)
      if (existingName && existingName.id !== voucherId) {
        throw new ErrorHandler(409, 'Voucher name already exists')
      }
    }

    if (voucherDto.code) {
      const existingCode = await VoucherRepository.findByCode(voucherDto.code)
      if (existingCode && existingCode.id !== voucherId) {
        throw new ErrorHandler(409, 'Voucher code already exists')
      }
    }

    const voucher = await VoucherRepository.update(voucherId, voucherDto)
    return voucher
  }

  static async updateStatus(
    voucherId: string,
    voucherDto: UpdateStatusVoucherDto
  ) {
    const findVoucher = await VoucherRepository.findById(voucherId)
    if (!findVoucher) {
      throw new ErrorHandler(404, 'Voucher not found')
    }
    const voucher = await VoucherRepository.updateStatus(voucherId, voucherDto)
    return voucher
  }

  static async delete(voucherId: string) {
    const findVoucher = await VoucherRepository.findById(voucherId)
    if (!findVoucher) {
      throw new ErrorHandler(404, 'Voucher not found')
    }

    await VoucherRepository.delete(voucherId)
  }
}
