import { Request, Response } from "express";
import { updateProfileService } from "../../services/profile/profileService";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { User } from "../../types/user";

export const updatedUserController = async(req:Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }

    const data: User = { ...req.body};

    if (req.file) {
      data.avatar = req.file?.filename
    }

    const updateUser = await updateProfileService(userId, data);
    return sendSuccess(res, 200, "Profile updated successfully", updateUser);
  } catch (error: any) {
    console.error("UpdateProfile Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}