import { Category } from "@prisma/client";

export type CategoryResponse = {
  id: number;
  name: string;
  description: string | null;
}

export type CategoryCreateRequest = {
  name: string;
  description?: string;
}

export type CategoryUpdateRequest = {
  name: string;
  description?: string;
}

export function toCategoryResponse(category: Category) : CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    description: category.description
  }
}