import prisma from "../../config/prisma.config";
import { createProduct } from "../../types/product";

export const createProductService = async (data: createProduct) => {
  const {
    name,
    category_id,
    description,
    price,
    discount_percent,
    stock,
    image
  } = data;

  const existingProduct = await prisma.product.findFirst({
    where: { name }
  });

  if (existingProduct) {
    const error: any = new Error("Product name already exist");
    error.statusCode = 409;
    throw error;
  }

  const product = await prisma.product.create({
    data: {
      name,
      category_id,
      description,
      price,
      discount_percent: discount_percent ? Number(discount_percent) : 0,
      stock: stock ? Number(stock) : 0,
      image,
    },
    include: { category: true }
  });

  return product;
}