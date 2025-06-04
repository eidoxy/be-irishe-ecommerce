import { prismaClient } from "../config/db";
import path from 'path';
import fs from 'fs';
import { ResponseError } from "../middlewares/responseError";
import { ProductCreateRequest, ProductUpdateRequest, ProductResponse, toProductResponse } from "../model/product.model";
import { ProductValidation } from "../validations/product.validation";
import { Validation } from "../validations/validation";
import { client, uploadToS3, deleteFromS3 } from "../config/s3";

export class ProductService {
  static async getAll(sortBy: string = 'name', sortOrder: 'asc' | 'desc' = 'asc', categoryId?: number) : Promise<ProductResponse[]> {
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const whereClause: any = {};
    if (categoryId !== undefined) {
      const categoryExists = await prismaClient.category.findUnique({
        where: { id: categoryId }
      });

      if (!categoryExists) {
        throw new ResponseError(404, "Category not found");
      }

      whereClause.categoryId = categoryId;
    }
    
    const products = await prismaClient.product.findMany({
      where: whereClause,
      orderBy: orderBy,
      include: {
        category: true
      }
    });

    return products.map((product) => toProductResponse(product));
  }

  static async getById(id: number) : Promise<ProductResponse> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id
      },
      include: {
        category: true
      }
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    return toProductResponse(product);
  }

  static async create(request: ProductCreateRequest) : Promise<ProductResponse> {    
    // validate the request
    const createRequest = Validation.validate(ProductValidation.CREATE, request)

    // check if the product already exists
    const totalProductWithSameName = await prismaClient.product.count({
      where: {
        name: createRequest.name
      }
    });

    if (totalProductWithSameName != 0) {
      throw new ResponseError(400, "Product already exists");
    }

    // Upload image to S3 if provided
    let s3ImageUrl = null;
    if (createRequest.image) {
      s3ImageUrl = await uploadToS3(createRequest.image);
    }

    const productData = {
      name: createRequest.name,
      description: createRequest.description || null,
      price: createRequest.price,
      stock: createRequest.stock,
      categoryId: createRequest.categoryId,
      imageUrl: s3ImageUrl
    };
    
    // create the product
    const product = await prismaClient.product.create({
      data: productData,
      include: {
        category: true
      }
    });

    return toProductResponse(product);
  }

  static async update(id: number, request: ProductUpdateRequest) : Promise<ProductResponse> {
    // validate the request
    const updateRequest = Validation.validate(ProductValidation.UPDATE, request)

    // check if the product exists
    const product = await prismaClient.product.findUnique({
      where: {
        id: id
      }
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    // check if the product name already exists
    const totalProductWithSameName = await prismaClient.product.count({
      where: {
        name: updateRequest.name,
        id: {
          not: id
        }
      }
    });

    if (totalProductWithSameName != 0) {
      throw new ResponseError(400, "Product already exists");
    }

    // Upload new image to S3 if provided
    let imageUrl = null;
    if (updateRequest.image) {
      // Delete the old image from S3 if it exists
      await deleteFromS3(product.imageUrl);

      // Upload the new image to S3
      imageUrl = await uploadToS3(updateRequest.image);
    } else {
      // If no new image is provided, keep the old image URL
      imageUrl = product.imageUrl;
    }

    const productData = {
      name: updateRequest.name,
      description: updateRequest.description || null,
      price: updateRequest.price,
      stock: updateRequest.stock,
      categoryId: updateRequest.categoryId,
      imageUrl: imageUrl
    };

    // update the product
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: id
      },
      data: productData,
      include: {
        category: true
      }
    });

    return toProductResponse(updatedProduct);
  }

  static async delete(id: number) : Promise<ProductResponse> {
    // check if the product exists
    const product = await prismaClient.product.findUnique({
      where: {
        id: id
      }
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    // Delete the image from S3 if it exists
    await deleteFromS3(product.imageUrl);

    // delete the product
    const deletedProduct = await prismaClient.product.delete({
      where: {
        id: id
      },
      include: {
        category: true
      }
    });

    return toProductResponse(deletedProduct);
  }
}