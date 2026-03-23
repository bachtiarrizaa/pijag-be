import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dtos/category.dtos'
import { CategoryRepository } from '../repositories/category.repository'
import { ErrorHandler } from '../utils/error.utils'

export class CategoryService {
  static async create(categoryDto: CreateCategoryDto) {
    const existingCategory = await CategoryRepository.findByName(
      categoryDto.name
    )
    if (existingCategory) {
      throw new ErrorHandler(400, 'Category already exists')
    }

    const category = await CategoryRepository.create(categoryDto)
    return category
  }

  static async getCategories() {
    const categories = await CategoryRepository.findCategories()
    return categories
  }

  static async getCategoryById(categoryId: string) {
    const category = await CategoryRepository.findById(categoryId)
    if (!category) {
      throw new ErrorHandler(404, 'Category not found')
    }
    return category
  }

  static async update(categoryId: string, categoryDto: UpdateCategoryDto) {
    const findCategory = await CategoryRepository.findById(categoryId)
    if (!findCategory) {
      throw new ErrorHandler(404, 'Category not found')
    }

    const existingCategory = await CategoryRepository.findByName(
      categoryDto.name
    )
    if (existingCategory) {
      throw new ErrorHandler(400, 'Category name already exist')
    }

    const category = await CategoryRepository.update(categoryId, categoryDto)
    return category
  }

  static async delete(categoryId: string) {
    const findCategory = await CategoryRepository.findById(categoryId)
    if (!findCategory) {
      throw new ErrorHandler(404, 'Category not found')
    }

    const category = await CategoryRepository.delete(categoryId)
    return category
  }
}
