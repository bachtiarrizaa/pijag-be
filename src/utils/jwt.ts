import jwt, { SignOptions, JwtPayload} from "jsonwebtoken";
import { appConfig } from "../config/app.config";

const JWT_SECRET = appConfig.JWTSECRET;
const JWT_EXPIRES = appConfig.JWTEXPIRES;

export function generateToken(payload: object): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES,
    
  };
  return jwt.sign(payload, JWT_SECRET as string, options);
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): string | JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET as string);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}