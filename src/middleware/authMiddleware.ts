import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config";
import { appConfig } from "../config/app.config";
import { JwtPayloadType } from "../types/jwtType";

export const authenticateToken = async (
  req: Request, res: Response, next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided"
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token missing"
      });
    }

    const blacklisted = await prisma.blacklistToken.findFirst({
      where: { token }
    });

    if (blacklisted) {
      return res.status(401).json({
        message: "Token has been revoked"
      });
    }

    const decoded = jwt.verify(token, appConfig.JWTSECRET as jwt.Secret) as JwtPayloadType;

    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error("AuthMiddleware Error:", error.message);
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user) return res.status(403).json({ message: "Forbidden: No user data" });

      if (!user.role_name || !allowedRoles.includes(user.role_name)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error: any) {
      console.error("RoleMiddleware Error:", error.message);
      return res.status(403).json({ message: "Unauthorized role" });
    }
  };
};

export const isAdmin = [
  authenticateToken,
  authorizeRole(["admin"])
];