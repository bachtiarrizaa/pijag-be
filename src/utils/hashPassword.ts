import bcrypt from "bcrypt";
import { hashPasswordType } from "../types/hashPassword";

async function hashPassword({ password }: hashPasswordType) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword({ password, hashed }: hashPasswordType) {
  return bcrypt.compare(password, hashed)
}

export default {
  hashPassword,
  comparePassword,
}