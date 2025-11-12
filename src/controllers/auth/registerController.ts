import { Request, Response } from "express";
import registerService from "../../services/auth/registerService";
import { sendError, sendSuccess } from "../../utils/responseHandler";

const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerService(req.body);
    // res.status(201).json({
    //   message: "Register successfully",
    //   data: user,
    // });
    return sendSuccess(
      res, 200, "Register successfulyy",
      user,
    )
  } catch (error: any) {
    console.error("RegisterController Error:", error.message);

    // res.status(error.statusCode || 400).json({
    //   message: error.message || "Failed to register user",
    // });

    return sendError(
      res, error.statusCode || 400, error.message || "Failed to register user"
    )
  }
};

export default registerController;
