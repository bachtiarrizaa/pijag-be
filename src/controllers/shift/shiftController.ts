import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { endShiftService, startShiftService } from "../../services/shift/shiftService";

export const startShiftController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }

    const shift = await startShiftService(userId, req.body);
    return sendSuccess(res, 201, "Shift started successfully", shift);
  } catch (error: any) {
    console.error("StartShift Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};

export const endShiftController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }

    const endShift = await endShiftService(userId, req.body);
    return sendSuccess(res, 201, "Shift ended successfully", endShift)
  } catch (error: any) {
    console.error("EndShift Error:", error.message);
    return sendError(res, error.statusCode || 400, error.message);
  }
};