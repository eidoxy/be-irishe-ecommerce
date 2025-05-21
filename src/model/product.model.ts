import { Product, Category } from "@prisma/client";

export type ProductResponse = {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
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
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.imageUrl
  }
}