import { prismaClient } from "../config/db";
import path from 'path';
import fs from 'fs';
import { ResponseError } from "../middlewares/responseError";
import { ProductCreateRequest, ProductUpdateRequest, ProductResponse, toProductResponse } from "../model/product.model";
import { ProductValidation } from "../validations/product.validation";
import { Validation } from "../validations/validation";
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;
const awsS3Bucket = process.env.AWS_S3_BUCKET;

if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion || !awsS3Bucket) {
  throw new Error("AWS credentials or region or bucket name not set in environment variables");
}

const client = new S3Client({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsRegion,
});

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

    // Upload image to S3 if provided
    let s3ImageUrl = null;
    if (createRequest.image) {
      const params = {
        Bucket: awsS3Bucket,
        Key: createRequest.image.filename || `${Date.now()}-${createRequest.image.originalname}`,
        Body: createRequest.image.buffer,
        ContentType: createRequest.image.mimetype,
      };

      const command = new PutObjectCommand(params);
      await client.send(command);

      s3ImageUrl = `https://${awsS3Bucket}.s3.${awsRegion}.amazonaws.com/${params.Key}`;
    }

    // const imageUrl = createRequest.image ? `/uploads/${createRequest.image.filename}` : null;

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

    const imageUrl = updateRequest.image 
    ? `/uploads/${updateRequest.image.filename}` // Use just the filename with correct path
    : null;

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

    // Delete the associated image file if it exists
    if (product.imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), 'public', product.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Image deleted: ${imagePath}`);
        }
      } catch (error) {
        console.error(`Error deleting image: ${error}`);
      }
    }

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