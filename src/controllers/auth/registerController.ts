import { Request, Response } from "express";
import registerService from "../../services/auth/registerService";

const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerService(req.body);

    // Prisma BigInt fix
    const safeUser = JSON.parse(
      JSON.stringify(user, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.status(201).json({
      message: "Register successfully",
      data: safeUser,
    });
  } catch (error: any) {
    console.error("RegisterController Error:", error.message);

    res.status(error.statusCode || 400).json({
      message: error.message || "Failed to register user",
    });
  }
};

export default registerController;
