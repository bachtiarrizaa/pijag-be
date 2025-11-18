import prisma from "../../config/prisma.config";
import { Shift } from "../../types/shift";


export const startShiftService = async (userId: number, data: Shift) => {
  const { cash_start, notes } = data;

  const activeShift = await prisma.shift.findFirst({
    where: { user_id: userId, status: "OPEN" }
  });

  if (activeShift) {
    const error: any = new Error("You still have an active shift");
    error.statusCode = 400;
    throw error;
  }

  if (!cash_start) {
    const error: any = new Error("Cash start is reuired");
    error.statusCode = 400;
    throw error;
  }

  const newShift = await prisma.shift.create({
    data: {
      user_id: userId,
      cash_start: parseFloat(cash_start),
      start_time: new Date(),
      status: "OPEN",
      notes: notes ?? null,
    },
  });

  return newShift;
}

export const endShiftService = async (userId: number, data: Shift) => {
  const { cash_end, notes } = data;

  const activeShift = await prisma.shift.findFirst({
    where: { user_id: userId, status: "OPEN" }
  });

  if (!activeShift) {
    const error: any = new Error("No active shift found!");
    error.statusCode = 400;
    throw error;
  }

  if (!cash_end) {
    const error: any = new Error("Cash end is required");
    error.statusCode = 400;
    throw error;
  }

  const endShift = await prisma.shift.update({
    where: { id:activeShift.id },
    data: {
      cash_end: parseFloat(cash_end),
      end_time: new Date(),
      status: "CLOSED",
      notes: notes ?? null,
    },
  });

  return endShift;
}