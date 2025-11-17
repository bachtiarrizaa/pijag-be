import bcrypt from "bcrypt";
import prisma from "../../config/prisma.config";
import { Auth } from "../../types/auth";

export const registerService = async (data:Auth) => {
  const { name, username, email, password } = data;

  // Cek email sudah terdaftar
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  
  if (existingEmail) {
    const error: any = new Error("Email already exists!");
    error.statusCode = 409;
    throw error;
  }

  // Cek username sudah terdaftar
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    const error: any = new Error("Username already exists!");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultRoleId = 3;

  // Buat user baru
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      // phone_number,
      password: hashedPassword,
      role_id: defaultRoleId,
    },
    include: { role: true}
  });

  if (user.role?.name.toLowerCase() === "customer") {
    await prisma.customer.create({
      data: {
        user_id: user.id,
        points: 0,
      }
    })
  }

  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role?.name,
    }
  }
};