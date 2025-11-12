import { Request, Response } from "express";
import logoutService from "../../services/auth/logoutService";
import { sendSuccess, sendError } from "../../utils/responseHandler";

const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return sendError(res, 401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return sendError(res, 401, "Token missing");
    }

    const result = await logoutService(token);
    return sendSuccess(res, 200, result.message);
  } catch (error: any) {
    console.error("LogoutController Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message || "Failed to logout");
  }
};

export default logoutController;
