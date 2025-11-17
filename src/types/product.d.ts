export interface createProduct {
  category_id: number;
  name: string;
  description: string;
  price: number;
  discount_percent?: number;
  stock: number;
  image: string;
}
