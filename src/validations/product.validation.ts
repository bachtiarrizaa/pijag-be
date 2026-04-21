import z from 'zod'

export const productSchema = z.object({
  categoryId: z.string().cuid('Invalid category ID format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  stock: z.coerce
    .number()
    .int()
    .nonnegative('Stock must be a non-negative integer'),
  isAvailable: z.coerce.boolean().default(true),
  isActive: z.coerce.boolean().default(true),
  image: z.string().nullable().default(null),
})

export const updateProductSchema = productSchema
  .omit({ isActive: true, isAvailable: true, image: true })
  .extend({
    isAvailable: z.coerce.boolean().optional(),
    image: z.string().optional(),
  })
  .partial()

export const updateStatusProductSchema = z.object({
  isActive: z.coerce.boolean(),
})
