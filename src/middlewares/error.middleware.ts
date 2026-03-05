import type { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../utils/error.utils'

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ErrorHandler) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }

  console.error('[ERROR]', error)
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
