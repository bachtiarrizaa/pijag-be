import 'dotenv/config'
import type { AppConfig } from '../types/config.type'

export const appConfig: AppConfig = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'pijag-secret',
}
