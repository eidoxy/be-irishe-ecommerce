import { prismaClient } from "../config/db";
import { ResponseError } from "../middlewares/responseError";
import { CategoryCreateRequest, CategoryResponse, toCategoryResponse } from "../model/category.model";
import { CategoryValidation } from "../validations/category.validation";
import { Validation } from "../validations/validation";

export class CategoryService {
  static async getAll() : Promise<CategoryResponse[]> {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return categories.map((category) => toCategoryResponse(category));
  }

  static async getById(id: number) : Promise<CategoryResponse> {
    const category = await prismaClient.category.findUnique({
      where: {
        id: id
      }
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    return toCategoryResponse(category);
  }
  
  static async create(request: CategoryCreateRequest) : Promise<CategoryResponse> {
    // validate the request
    const createRequest = Validation.validate(CategoryValidation.CREATE, request)

    // check if the category already exists
    const totalCategoryWithSameName = await prismaClient.category.count({
      where: {
        name: createRequest.name
      }
    });

    if (totalCategoryWithSameName != 0) {
      throw new ResponseError(400, "Category already exists");
    }

    // create the category
    const category = await prismaClient.category.create({
      data: createRequest
    });

    return toCategoryResponse(category);
  }

  static async update(id: number, request: CategoryUpdateRequest) : Promise<CategoryResponse> {
    // validate the request
    const updateRequest = Validation.validate(CategoryValidation.UPDATE, request);

    // check if the category id exists
    const category = await prismaClient.category.findUnique({
      where: {
        id: id
      }
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    // check if the category with same name already exists
    const totalCategoryWithSameName = await prismaClient.category.count({
      where: {
        name: updateRequest.name
      }
    });

    if (totalCategoryWithSameName != 0) {
      throw new ResponseError(400, "Category already exists");
    }

    // update the category
    const updatedCategory = await prismaClient.category.update({
      where: {
        id: id
      },
      data: updateRequest
    });

    return toCategoryResponse(updatedCategory);
  }

  static async delete(id: number) : Promise<CategoryResponse> {
    // check if the category exists
    const category = await prismaClient.category.findUnique({
      where: {
        id: id
      }
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    // delete the category
    const deletedCategory = await prismaClient.category.delete({
      where: {
        id: id
      }
    });

    return toCategoryResponse(deletedCategory);
  }
}