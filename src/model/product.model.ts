import { Product, Category } from "@prisma/client";

export type ProductResponse = {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export type ProductCreateRequest = {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: Express.Multer.File;
}

export type ProductUpdateRequest = {
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: Express.Multer.File;
}

export function toProductResponse(product: Product & { category: Category }) : ProductResponse {
  return {
    id: product.id,
    categoryId: product.categoryId,
    categoryName: product.category.name,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl
  }
}