import prisma from "../../config/prisma.config";
import { User } from "../../types/user";

export const updateProfileService = async (userId: number, data: User) => {
  const { name, avatar, username, email, phone_number, birth_of_date } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    const error: any = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (email) {
    const existingEmail = await prisma.user.findFirst({
      where: { email, NOT: { id: userId } }
    });

    if (existingEmail) {
      const error: any = new Error("Email already exists!");
      error.statusCode = 409;
      throw error;
    }
  }

  if (username) {
    const existingUsername = await prisma.user.findFirst({
      where: { username, NOT: { id: userId } }
    });

    if (existingUsername) {
      const error: any = new Error("Username already exist");
      error.statusCode = 409;
      throw error;
    }
  }

  const dataToUpdate: any = {
    name,
    username,
    email,
    phone_number,
  };

  if (birth_of_date) {
    dataToUpdate.birth_of_date = new Date(birth_of_date);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
    include: { role: true}
  });

  return {
    id: updatedUser.id,
    avatar: updatedUser.avatar,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    phone_number: updatedUser.phone_number,
    birth_of_date: updatedUser.birth_of_date,
    role: updatedUser.role?.name
  };
};


