import { Request, Response } from "express";
import loginService from "../../services/auth/loginServices";

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await loginService(req.body);

    res.status(200).json({
      message: "Login successfully",
      data,
    });
  } catch (error: any) {
    console.error("LoginController Error:", error.message);
    res.status(error.statusCode || 400).json({
      message: error.message || "Failed to login",
    });
  }
};

export default loginController;
