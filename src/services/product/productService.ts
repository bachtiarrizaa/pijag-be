import prisma from "../../config/prisma.config";
import { createProduct, updateProduct } from "../../types/product";

export const createProductService = async (data: createProduct) => {
  const {
    category_id,
    name,
    description,
    price,
    stock,
    image,
  } = data;

  if (!category_id || !name || !description || !price || !stock || !image) {
    const error: any = new Error("Missing reuired field!");
    error.statusCode = 400;
    throw error;
  }

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
      category_id,
      name,
      description,
      price,
      stock: Number(stock),
      image,
    },
    include: { category: true }
  });

  return product;
}

export const getAllProductService = async() => {
  const getAllProduct = await prisma.product.findMany({
    orderBy: {
      created_at: "desc"
    }
  });

  return getAllProduct;
}

export const getProductByIdService = async (productId: number) => {
  const getProductbyId = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!getProductbyId) {
    const error: any = new Error("Product not found!");
    error.statusCode = 404;
    throw error;
  }

  return getProductbyId;
}

export const updateProductService = async (productId: number, data: updateProduct) => {
  const { category_id, name, description, price, stock, image } = data;

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  // Cek duplikasi name hanya jika name tidak kosong
  if (name && name.trim() !== "") {
    const existing = await prisma.product.findFirst({
      where: {
        name,
        NOT: { id: productId }
      }
    });

    if (existing) {
      const error: any = new Error("Product already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const updatedData: any = {};

  if (category_id !== undefined) updatedData.category_id = Number(category_id);
  if (name !== undefined && name.trim() !== "") updatedData.name = name;
  if (description !== undefined) updatedData.description = description;
  if (price !== undefined) updatedData.price = Number(price);
  if (stock !== undefined) updatedData.stock = Number(stock);
  if (image !== undefined) updatedData.image = image;

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: updatedData,
  });

  return updatedProduct;
};

export const deleteProductService = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    const error: any = new Error("Product not found")
    error.statusCode = 404;
    throw error;
  }

  const deleteProduct = await prisma.product.delete({
    where: { id: productId }
  });

  return deleteProduct;
}