import bcrypt from 'bcryptjs'
import prisma from '../config/db.config'
import type { RegisterDto } from '../dtos/auth.dtos'

export class UserRepository {
  static async create(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 12)
    return prisma.user.create({
      data: {
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        roleId: 'cmmd1srwj0002yljxc497w6er',
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: {
          select: { id: true, name: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  static async findUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    })
  }

  static async findEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    })
  }

  static async findEmailWithPassword(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        role: {
          select: { id: true, name: true },
        },
      },
    })
  }

  static async findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: {
          select: { id: true, name: true },
        },
      },
    })
  }
}
