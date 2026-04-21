import type { DiscountType } from '../constants/discount.constants'

export interface CreateDiscountDto {
  name: string
  description?: string
  type: DiscountType
  value: number
  startDate?: Date | null
  endDate?: Date | null
  isActive?: boolean
}

export interface UpdateDiscountDto {
  name?: string
  description?: string
  type?: DiscountType
  value?: number
  startDate?: Date | null
  endDate?: Date | null
}

export interface UpdateStatusDiscountDto {
  isActive: boolean
}
