import { Request, Response } from "express";
import logoutService from "../../services/auth/logoutService";

const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    const result = await logoutService(token); // ✅ Sekarang token dijamin string

    res.status(200).json(result);
  } catch (error: any) {
    console.error("LogoutController Error:", error.message);
    res.status(error.statusCode || 400).json({
      message: error.message || "Failed to logout",
    });
  }
};

export default logoutController;
