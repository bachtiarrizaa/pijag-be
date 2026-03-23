import prisma from '../config/db.config'
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dtos/category.dtos'

export class CategoryRepository {
  static async create(categoryDto: CreateCategoryDto) {
    return prisma.category.create({
      data: { name: categoryDto.name },
    })
  }

  static async findByName(name: string) {
    return prisma.category.findFirst({
      where: { name },
    })
  }

  static async findCategories() {
    return prisma.category.findMany()
  }

  static async findById(categoryId: string) {
    return prisma.category.findUnique({
      where: { id: categoryId },
    })
  }

  static async update(categoryId: string, categoryDto: UpdateCategoryDto) {
    return prisma.category.update({
      where: { id: categoryId },
      data: { name: categoryDto.name },
    })
  }

  static async delete(categoryId: string) {
    return prisma.category.delete({
      where: { id: categoryId },
    })
  }
}
