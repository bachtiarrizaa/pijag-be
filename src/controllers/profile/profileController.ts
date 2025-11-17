import { Request, Response } from "express";
import { updateProfileService } from "../../services/profile/profileService";
import { sendError, sendSuccess } from "../../utils/responseHandler";

export const updatedUserController = async(req:Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const avatar = req.file?.filename;

    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }
    const reqBody = {
      ...req.body,
      avatar
    };

    const updateUser = await updateProfileService(userId, reqBody);
    return sendSuccess(res, 200, "Profile updated successfully", updateUser);
  } catch (error: any) {
    console.error("UpdateProfile Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
}