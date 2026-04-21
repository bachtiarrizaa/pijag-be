import type { NextFunction, Request, Response } from 'express'
import { categorySchema } from '../validations/category.validation'
import { ValidationUtils } from '../utils/validation.utils'
import { CategoryService } from '../services/category.service'

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = categorySchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const category = await CategoryService.create(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Category created successfull',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories()
      return res.status(200).json({
        success: true,
        message: 'All categories fetched successfull',
        data: categories,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categoryId = String(req.params.id)

      const category = await CategoryService.getCategoryById(categoryId)
      return res.status(200).json({
        success: true,
        message: 'Fetched category by Id successfull',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = String(req.params.id)

      const parsed = categorySchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const category = await CategoryService.update(categoryId, parsed.data)

      return res.status(200).json({
        success: true,
        message: 'Category updated successfull',
        data: category,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = String(req.params.id)

      await CategoryService.delete(categoryId)
      return res.status(200).json({
        success: true,
        message: 'Category deleted successfull',
      })
    } catch (error) {
      next(error)
    }
  }
}
