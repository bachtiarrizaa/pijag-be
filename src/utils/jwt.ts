// import jwt, { JwtPayload } from "jsonwebtoken";
// import { appConfig } from "../config/app.config";
// import type { SignOptions } from "jsonwebtoken";

// const JWT_SECRET = appConfig.JWTSECRET;
// const JWT_EXPIRES = appConfig.JWTEXPIRES as `${number}${"s" | "m" | "h" | "d"}`;

// export function generateToken(payload: object): string {
//   const options: SignOptions = {
//     expiresIn: JWT_EXPIRES, 
//   };

//   return jwt.sign(payload, JWT_SECRET, options);
// }


// export function verifyToken(token: string): string | JwtPayload {
//   try {
//     return jwt.verify(token, JWT_SECRET as string);
//   } catch (error) {
//     throw new Error("Invalid or expired token");
//   }
// }