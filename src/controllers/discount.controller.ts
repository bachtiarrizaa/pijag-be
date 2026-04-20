import type { NextFunction, Request, Response } from 'express'
import { validateRequest } from '../utils/validation.utils'
import { DiscountService } from '../services/discount.service'
import {
  createDiscountSchema,
  updateDiscountSchema,
} from '../validations/discount.validation'

export class DiscountController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createDiscountSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const discount = await DiscountService.create(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Discount created successfully',
        data: discount,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getDiscounts(req: Request, res: Response, next: NextFunction) {
    try {
      const discounts = await DiscountService.getDiscounts()
      return res.status(200).json({
        success: true,
        message: 'All discounts fetched successfully',
        data: discounts,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getDiscountById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const discountId = String(req.params.id)

      const discount = await DiscountService.getDiscountById(discountId)
      return res.status(200).json({
        success: true,
        message: 'Discount fetched successfully',
        data: discount,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const discountId = String(req.params.id)

      const parsed = updateDiscountSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      const discount = await DiscountService.update(discountId, parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Discount updated successfully',
        data: discount,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const discountId = String(req.params.id)
      await DiscountService.delete(discountId)
      return res.status(200).json({
        success: true,
        message: 'Discount deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
