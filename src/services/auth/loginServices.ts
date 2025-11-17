import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.config";
import { Auth } from "../../types/auth";
import { appConfig } from "../../config/app.config";

// async function loginService(data: authType) 
export const loginService = async (data: Auth) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    const error: any = new Error("Email not found!");
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error: any = new Error("Invalid password!");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign (
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role_id: user.role_id,
      role_name: user.role?.name,
    },
    appConfig.JWTSECRET as jwt.Secret,
    { expiresIn: appConfig.JWTEXPIRES }
  );

  return {
    // message: "Login successfully",
    data: {
      id: user.id,
      // name: user.name,
      username: user.username,
      email: user.email,
      // phone_number: user.phone_number,
      role: user.role?.name,
    },
    token,
  };
}
