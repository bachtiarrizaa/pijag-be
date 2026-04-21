import type { NextFunction, Request, Response } from 'express'
import { VoucherService } from '../services/voucher.service'
import {
  createVoucherSchema,
  updateVoucherSchema,
} from '../validations/voucher.validation'
import { ValidationUtils } from '../utils/validation.utils'

export class VoucherController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createVoucherSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }
      const voucher = await VoucherService.create(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Voucher created successfully',
        data: voucher,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getVouchers(req: Request, res: Response, next: NextFunction) {
    try {
      const vouchers = await VoucherService.getVouchers()
      return res.status(200).json({
        success: true,
        message: 'All Vouchers retrieved successfully',
        data: vouchers,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getVoucherById(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId = String(req.params.id)

      const invalidId = ValidationUtils.id(res, voucherId)
      if (!invalidId) {
        return ValidationUtils.id(res, voucherId)
      }

      const voucher = await VoucherService.getVoucherById(voucherId)
      return res.status(200).json({
        success: true,
        message: 'Voucher retrieved successfully',
        data: voucher,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId = String(req.params.id)

      const invalidId = ValidationUtils.id(res, voucherId)
      if (!invalidId) {
        return ValidationUtils.id(res, voucherId)
      }

      const parsed = updateVoucherSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const voucher = await VoucherService.update(voucherId, parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Voucher updated successfully',
        data: voucher,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId = String(req.params.id)
      await VoucherService.delete(voucherId)
      return res.status(200).json({
        success: true,
        message: 'Voucher deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
