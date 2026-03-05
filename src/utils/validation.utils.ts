import type { Response } from 'express'
import type { ZodError } from 'zod'

export const validateRequest = (res: Response, error: ZodError) => {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors: error.flatten().fieldErrors,
  })
}
