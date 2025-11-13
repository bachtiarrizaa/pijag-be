import prisma from "../../config/prisma.config";
import { categoryType } from "../../types/categoryType";

export const createCategoryService = async (data: categoryType) => {
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

export const getCategoryByIdService = async (id: number) => {
  const getCategoryById = await prisma.category.findUnique({
    where: { id }
  });

  if (!getCategoryById) {
    const error: any = new Error("Category not found!");
    error.statusCode = 404;
    throw error;
  }

  return getCategoryById;
};

export const updateCategoryService = async (data: categoryType) => {
  const { id, name } = data;
  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) {
    const error: any = new Error ("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const existing = await prisma.category.findFirst({
    where: {
      name,
      NOT: { id }
    }
  });

  if (existing) {
    const error: any = new Error("Category already exist");
    error.statusCode = 409;
    throw error;
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { name },
  });

  return updatedCategory;
}

export const deleteCategoryService = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) {
    const error: any = new Error ("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const deleteCategory = await prisma.category.delete({
    where: { id }
  });

  return deleteCategory;
}