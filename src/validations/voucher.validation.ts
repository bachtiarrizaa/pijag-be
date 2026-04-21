import z from 'zod'
import { VoucherType } from '../constants/voucher.constants'

const voucherBaseSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(10),
  description: z.string().min(10).max(255).optional(),
  type: z.nativeEnum(VoucherType, { message: 'Invalid voucher type' }),
  value: z.coerce.number().positive(),
  minOrder: z.coerce.number().positive().optional(),
  usageLimit: z.coerce.number().int().positive().optional(),
  perUserLimit: z.coerce.number().int().positive().optional(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
})

const voucherRefinements = {
  percentValue: (
    data: { type?: VoucherType; value?: number },
    ctx: z.RefinementCtx
  ) => {
    if (data.type === VoucherType.PERCENT && (data.value ?? 0) > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 100,
        origin: 'number',
        inclusive: true,
        message: 'Percentage value cannot exceed 100',
        path: ['value'],
      })
    }
  },
  dateRange: (
    data: { startDate?: Date | null; endDate?: Date | null },
    ctx: z.RefinementCtx
  ) => {
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'endDate must be after startDate',
        path: ['endDate'],
      })
    }
  },
}

export const createVoucherSchema = voucherBaseSchema
  .superRefine(voucherRefinements.percentValue)
  .superRefine(voucherRefinements.dateRange)

export const updateVoucherSchema = voucherBaseSchema
  .omit({ isActive: true })
  .partial()
  .superRefine(voucherRefinements.percentValue)
  .superRefine(voucherRefinements.dateRange)

export const updateStatusVoucherSchema = z.object({
  isActive: z.coerce.boolean(),
})
