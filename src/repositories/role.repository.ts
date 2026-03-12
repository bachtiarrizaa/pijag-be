import prisma from '../config/db.config'

export class RoleRepository {
  static async findRoleByName(name: string) {
    return prisma.role.findFirst({
      where: { name },
    })
  }
}
