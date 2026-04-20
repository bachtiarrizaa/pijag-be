import z from 'zod'
import { DiscountType } from '../constants/discount.constants'

export const createDiscountSchema = z.object({
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

export const updateDiscountSchema = createDiscountSchema.partial()
