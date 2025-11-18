import { AppConfig } from "../types/config";

export const appConfig: AppConfig = {
  PORT: parseInt(process.env.PORT || "3000", 10),
  ENV: process.env.ENV || "development",
  JWTSECRET: process.env.JWTSECRET || "secret",
  JWTEXPIRES: (process.env.JWT_EXPIRES || "1d"),
};
