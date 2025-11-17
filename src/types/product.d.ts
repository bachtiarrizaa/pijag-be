export type createProduct = {
  category_id: number;
  name: string;
  description: string;
  price: string | number;
  stock: number;
  image: string;
}

export type updateProduct = Partial<createProduct>;