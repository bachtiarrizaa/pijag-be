import type { VoucherType } from '../constants/voucher.constants'

export interface CreateVoucherDto {
  name: string
  code: string
  description?: string
  type: VoucherType
  value: number
  minOrder?: number
  usageLimit?: number
  perUserLimit?: number
  startDate?: Date | null
  endDate?: Date | null
  isActive?: boolean
}

export interface UpdateVoucherDto {
  name?: string
  code?: string
  description?: string
  type?: VoucherType
  value?: number
  minOrder?: number
  usageLimit?: number
  perUserLimit?: number
  startDate?: Date | null
  endDate?: Date | null
  isActive?: boolean
}
