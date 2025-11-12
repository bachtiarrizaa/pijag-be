import prisma from "../../config/prisma.config";
import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.config";

async function logoutService(token: string) {
  try {
    // Verifikasi token valid
    const decoded = jwt.verify(token, appConfig.JWTSECRET as jwt.Secret);

    // Simpan token ke blacklist
    await prisma.blacklistToken.create({
      data: {
        token,
        expired_at: new Date((decoded as any).exp * 1000),
      },
    });

    return { message: "Logout successfully" };
  } catch (error: any) {
    const err: any = new Error("Invalid or expired token");
    err.statusCode = 401;
    throw err;
  }
}

export default logoutService;
