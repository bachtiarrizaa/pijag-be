import type { NextFunction, Request, Response } from 'express'
import {
  productSchema,
  updateProductSchema,
  updateStatusProductSchema,
} from '../validations/product.validation'
import { ValidationUtils } from '../utils/validation.utils'
import { ProductService } from '../services/product.service'

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.file ? `/uploads/product/${req.file.filename}` : null
      const parsed = productSchema.safeParse({ ...req.body, image })
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const product = await ProductService.create(parsed.data)
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProducts()
      return res.status(200).json({
        success: true,
        message: 'All products fetched successfully',
        data: products,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = String(req.params.id)
      const validId = ValidationUtils.id(res, productId)
      if (!validId) {
        return
      }

      const product = await ProductService.getProductById(validId)
      return res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: product,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = String(req.params.id)
      const validId = ValidationUtils.id(res, productId)
      if (!validId) {
        return
      }

      const image = req.file
        ? `/uploads/product/${req.file.filename}`
        : undefined

      const parsed = updateProductSchema.safeParse({ ...req.body, image })
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const product = await ProductService.update(validId, parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = String(req.params.id)
      const validId = ValidationUtils.id(res, productId)
      if (!validId) {
        return
      }

      const parsed = updateStatusProductSchema.safeParse(req.body)
      if (!parsed.success) {
        return ValidationUtils.request(res, parsed.error)
      }

      const product = await ProductService.updateStatus(validId, parsed.data)
      return res.status(200).json({
        success: true,
        message: 'Product status updated successfully',
        data: product,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = String(req.params.id)
      const validId = ValidationUtils.id(res, productId)
      if (!validId) {
        return
      }

      await ProductService.delete(validId)
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
