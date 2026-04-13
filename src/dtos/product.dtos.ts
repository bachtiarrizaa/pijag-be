export interface CreateProductDto {
  categoryId: string
  name: string
  description: string
  price: number
  stock: number
  isAvailable?: boolean
  isActive?: boolean
  image?: string | null
}

export interface UpdateProductDto {
  categoryId?: string
  name?: string
  description?: string
  price?: number
  stock?: number
  isAvailable?: boolean
  image?: string | null
}

export interface UpdateStatusProductDto {
  isActive: boolean
}
