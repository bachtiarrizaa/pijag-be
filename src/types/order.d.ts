export interface CreateOrder {
  customer_id?: number;
  cashier_id?: number;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  quantity: number;
}