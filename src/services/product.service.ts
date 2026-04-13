import type { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import { ProductRepository } from '../repositories/product.repository'
import { ErrorHandler } from '../utils/error.utils'

export class ProductService {
  static async create(productDto: CreateProductDto) {
    const existingProduct = await ProductRepository.findByName(productDto.name)
    if (existingProduct) {
      throw new ErrorHandler(409, 'Product name already exists')
    }

    return ProductRepository.create(productDto)
  }

  static async getProducts() {
    const products = await ProductRepository.findProducts()
    return products
  }

  static async getProductById(productId: string) {
    const product = await ProductRepository.findById(productId)
    if (!product) {
      throw new ErrorHandler(404, 'Product not found')
    }
    return product
  }

  static async update(productId: string, productDto: UpdateProductDto) {
    const findProduct = await ProductRepository.findById(productId)
    if (!findProduct) {
      throw new ErrorHandler(404, 'Product not found')
    }

    if (productDto.name) {
      const existingProduct = await ProductRepository.findByName(
        productDto.name
      )
      if (existingProduct && existingProduct.id !== productId) {
        throw new ErrorHandler(409, 'Product name already exists')
      }
    }

    const product = await ProductRepository.update(productId, productDto)
    return product
  }

  static async delete(productId: string) {
    const findProduct = await ProductRepository.findById(productId)
    if (!findProduct) {
      throw new ErrorHandler(404, 'Product not found')
    }

    await ProductRepository.delete(productId)
  }
}
