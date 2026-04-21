import z from 'zod'
import { DiscountType } from '../constants/discount.constants'

export const discountBaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  type: z.nativeEnum(DiscountType, { message: 'Invalid discount type' }),
  value: z.coerce.number().positive('Value must be a positive number'),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
})

const discountRefinements = {
  percentValue: (
    data: { type?: DiscountType; value?: number },
    ctx: z.RefinementCtx
  ) => {
    if (data.type === DiscountType.PERCENT && (data.value ?? 0) > 100) {
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

export const createDiscountSchema = discountBaseSchema
  .superRefine(discountRefinements.percentValue)
  .superRefine(discountRefinements.dateRange)

export const updateDiscountSchema = discountBaseSchema
  .omit({ isActive: true })
  .extend({ isActive: z.coerce.boolean().optional() })
  .partial()
  .superRefine(discountRefinements.percentValue)
  .superRefine(discountRefinements.dateRange)
