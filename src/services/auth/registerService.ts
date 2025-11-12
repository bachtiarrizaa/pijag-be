import bcrypt from "bcrypt";
import prisma from "../../config/prisma.config";
import { authType } from "../../types/authType";

async function registerService(data: authType) {
  const { name, username, email, phone_number, password } = data;

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
  const role_id = 3;

  // Buat user baru
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      phone_number,
      password: hashedPassword,
      role_id,
    },
    include: { role: true}
  });

  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role?.name,
    }
  }
}

export default registerService;
