import { SignOptions } from "jsonwebtoken";

export interface AppConfigType {
  PORT: number;
  ENV: string;
  JWTSECRET: string;
  JWTEXPIRES: string;
}