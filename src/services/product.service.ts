import { prismaClient } from "../config/db";
import { ResponseError } from "../middlewares/responseError";
import { ProductCreateRequest, ProductUpdateRequest, ProductResponse, toProductResponse } from "../model/product.model";
import { ProductValidation } from "../validations/product.validation";
import { Validation } from "../validations/validation";

export class ProductService {
  static async getAll() : Promise<ProductResponse[]> {
    const products = await prismaClient.product.findMany({
      orderBy: {
        name: "asc"
      },
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

    const imageUrl = createRequest.image 
    ? `/uploads/${createRequest.image.filename}` // Use just the filename with correct path
    : null;

    const productData = {
      name: createRequest.name,
      description: createRequest.description || null,
      price: createRequest.price,
      stock: createRequest.stock,
      categoryId: createRequest.categoryId,
      imageUrl: imageUrl
    };
    
    console.log("Product data to create:", productData);
    
    // create the product
    const product = await prismaClient.product.create({
      data: productData,
      include: {
        category: true
      }
    });

    return toProductResponse(product);
  }
}