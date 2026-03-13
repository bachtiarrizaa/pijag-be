import type { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dtos'
import { RoleRepository } from '../repositories/role.repository'
import { ErrorHandler } from '../utils/error.utils'

export class RoleService {
  static async create(roleDto: CreateRoleDto) {
    const exisiingRole = await RoleRepository.findRoleByName(roleDto.name)
    if (exisiingRole) {
      throw new ErrorHandler(400, 'Role already exists')
    }

    const role = await RoleRepository.create(roleDto)
    return role
  }

  static async getRoles() {
    const roles = await RoleRepository.findRoles()
    return roles
  }

  static async update(roleId: string, roleDto: UpdateRoleDto) {
    const findRole = await RoleRepository.findRoleById(roleId)
    if (!findRole) {
      throw new ErrorHandler(404, 'Role not found')
    }

    const exisitngName = await RoleRepository.findRoleByName(roleDto.name)
    if (exisitngName) {
      throw new ErrorHandler(400, 'Role name already exist')
    }

    const role = await RoleRepository.update(roleId, roleDto)
    return role
  }

  static async delete(roleId: string) {
    const role = await RoleRepository.findRoleById(roleId)
    if (!role) {
      throw new ErrorHandler(404, 'Role not found')
    }

    await RoleRepository.delete(roleId)
  }
}
