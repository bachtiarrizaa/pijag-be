export interface AppConfig {
  APP_ENV: string
  APP_HOST: string
  APP_PORT: number
  JWT_SECRET: string
}

export interface JwtPayload {
  userId: string
  roleId: string
  roleName: string
  exp?: number
}
