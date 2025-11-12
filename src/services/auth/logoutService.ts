import prisma from "../../config/prisma.config";
import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.config";

const logoutService = async (token: string): Promise<void> => {
  try {
    // Cek apakah token sudah pernah di-blacklist
    const existing = await prisma.blacklistToken.findFirst({ where: { token } });
    if (existing) {
      throw new Error("Token already blacklisted");
    }

    // Verifikasi token untuk mendapatkan waktu kedaluwarsa
    const decoded = jwt.verify(token, appConfig.JWTSECRET as jwt.Secret) as any;

    // Simpan token ke tabel blacklist
    await prisma.blacklistToken.create({
      data: {
        token,
        expired_at: new Date(decoded.exp * 1000),
      },
    });

    // return { message: "Logout successfully" };
  } catch (error: any) {
    console.error("LogoutService Error:", error.message);
    const err: any = new Error("Invalid or expired token");
    err.statusCode = 401;
    throw err;
  }
};

export default logoutService;
