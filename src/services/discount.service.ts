import type {
  CreateDiscountDto,
  UpdateDiscountDto,
} from '../dtos/discount.dtos'
import { DiscountRepository } from '../repositories/discount.repository'
import { ErrorHandler } from '../utils/error.utils'

export class DiscountService {
  static async create(discountDto: CreateDiscountDto) {
    const existingDiscount = await DiscountRepository.findByName(
      discountDto.name
    )
    if (existingDiscount) {
      throw new ErrorHandler(409, 'Discount name already exists')
    }
    return DiscountRepository.create(discountDto)
  }

  static async getDiscounts() {
    const discounts = await DiscountRepository.findDiscounts()
    return discounts
  }

  static async getDiscountById(discountId: string) {
    const discount = await DiscountRepository.findById(discountId)
    if (!discount) {
      throw new ErrorHandler(404, 'Discount not found')
    }
    return discount
  }

  static async update(dsicountId: string, discountDto: UpdateDiscountDto) {
    const findDiscount = await DiscountRepository.findById(dsicountId)
    if (!findDiscount) {
      throw new ErrorHandler(404, 'Discount not found')
    }

    if (discountDto.name) {
      const existingDiscount = await DiscountRepository.findByName(
        discountDto.name
      )
      if (existingDiscount && existingDiscount.id !== findDiscount.id) {
        throw new ErrorHandler(409, 'Discount name already exists')
      }
    }
    const discount = await DiscountRepository.update(dsicountId, discountDto)
    return discount
  }

  static async delete(discountId: string) {
    const findDiscount = await DiscountRepository.findById(discountId)
    if (!findDiscount) {
      throw new ErrorHandler(404, 'Discount not found')
    }

    await DiscountRepository.delete(discountId)
  }
}
