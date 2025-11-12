import { Request, Response } from "express";
import loginService from "../../services/auth/loginServices";
import { sendError, sendSuccess } from "../../utils/responseHandler";

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await loginService(req.body);
    return sendSuccess(
      res, 200, "Login successfully",
      data
    );
    // res.status(200).json({
    //   message: "Login successfully",
    //   data,
    // });
  } catch (error: any) {
    console.error("LoginController Error:", error.message);
    return sendError(
      res, error.statusCode || 400, error.message || "Failed to login"
    )
    
    // res.status(error.statusCode || 400).json({
    //   message: error.message || "Failed to login",
    // });
  }
};

export default loginController;
