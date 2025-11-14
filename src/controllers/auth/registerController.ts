import { Request, Response } from "express";
import { registerService } from "../../services/auth/registerService";
import { sendError, sendSuccess } from "../../utils/responseHandler";

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerService(req.body);
    return sendSuccess(
      res, 200, "Register successfulyy",
      user,
    )
  } catch (error: any) {
    console.error("RegisterController Error:", error.message);
    return sendError(
      res,
      error.statusCode || 400,
      error.message || "Failed to register user"
    )
  }
};
