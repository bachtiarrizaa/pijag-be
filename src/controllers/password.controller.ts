import type { NextFunction, Request, Response } from 'express'
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validations/auth.validation'
import { validateRequest } from '../utils/validation.utils'
import { PasswordService } from '../services/password.service'

export class PasswordController {
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = forgotPasswordSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      await PasswordService.forgotPassword(parsed.data)

      return res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive an OTP shortly',
      })
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = resetPasswordSchema.safeParse(req.body)
      if (!parsed.success) {
        return validateRequest(res, parsed.error)
      }

      await PasswordService.resetPassword(parsed.data)

      return res.status(200).json({
        success: true,
        message: 'Password reset successful',
      })
    } catch (error) {
      next(error)
    }
  }
}
