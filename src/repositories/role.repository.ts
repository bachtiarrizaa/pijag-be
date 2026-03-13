import prisma from '../config/db.config'
import type { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dtos'

export class RoleRepository {
  static async findRoleByName(name: string) {
    return prisma.role.findFirst({
      where: { name },
    })
  }

  static async findRoleById(roleId: string) {
    return prisma.role.findUnique({
      where: { id: roleId },
    })
  }

  static async create(roleDto: CreateRoleDto) {
    return prisma.role.create({
      data: { name: roleDto.name },
    })
  }

  static async findRoles() {
    return prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  static async update(roleId: string, roleDto: UpdateRoleDto) {
    return prisma.role.update({
      where: { id: roleId },
      data: { name: roleDto.name },
    })
  }

  static async delete(roleId: string) {
    return prisma.role.delete({
      where: { id: roleId },
    })
  }
}
