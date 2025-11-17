import prisma from "../../config/prisma.config";
import { Category } from "../../types/category";

export const createCategoryService = async (data: Category) => {
  const { name } = data;
  const existing = await prisma.category.findFirst({
    where: { name }
  });

  if (existing) {
    const error: any = new Error("Category already exist!");
    error.statusCode = 409;
    throw error;
  }

  const createCategory = await prisma.category.create({
    data: {
      name
    }
  });

  return createCategory;
}

export const getAllCategoriesService = async () => {
  const getAllCategory = await prisma.category.findMany({
    orderBy: {
      created_at: "desc"
    }
  });

  return getAllCategory;
}

export const getCategoryByIdService = async (categoryId: number) => {
  const getCategoryById = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!getCategoryById) {
    const error: any = new Error("Category not found!");
    error.statusCode = 404;
    throw error;
  }

  return getCategoryById;
};

export const updateCategoryService = async (categoryId: number, data: Category) => {
  const { name } = data;
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    const error: any = new Error ("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const existing = await prisma.category.findFirst({
    where: {
      name,
      NOT: { id: categoryId }
    }
  });

  if (existing) {
    const error: any = new Error("Category already exist");
    error.statusCode = 409;
    throw error;
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { name },
  });

  return updatedCategory;
}

export const deleteCategoryService = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    const error: any = new Error ("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const deleteCategory = await prisma.category.delete({
    where: { id: categoryId }
  });

  return deleteCategory;
}