import z from 'zod'

export const registerValidation = z.object({
  name: z.string().min(2, 'Name must be at leat 2 characters').max(100),
  username: z
    .string()
    .min(3, 'Username must be at leasts 3 characters')
    .max(100)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export const loginValidation = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

export const refreshTokenValidation = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})
