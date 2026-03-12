import prisma from '../config/db.config'
import type { OAuthDto } from '../dtos/auth.dtos'
import type { CreateUserDto } from '../dtos/user.dtos'

export class UserRepository {
  static async create(dto: CreateUserDto) {
    return prisma.user.create({
      data: {
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: dto.password,
        roleId: dto.roleId,
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

  static async createOAuthUser(dto: OAuthDto) {
    return prisma.user.create({
      data: {
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: null,
        roleId: dto.roleId,
      },
      select: {
        id: true,
        role: { select: { id: true, name: true } },
      },
    })
  }

  static async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    })
  }

  static async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        roleId: true,
        role: { select: { id: true, name: true } },
      },
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
        birthDate: true,
        phoneNumber: true,
        role: {
          select: { id: true, name: true },
        },
        customer: {
          select: { id: true, points: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  static async findUserWithPassword(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    })
  }

  static async updatePassword(userId: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })
  }
}
