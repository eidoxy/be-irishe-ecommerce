import { ProductCreateRequest, ProductUpdateRequest } from "../model/product.model";
import { ProductService } from "../services/product.service";
import { Request, Response, NextFunction } from "express";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.getAll();
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await ProductService.getById(id);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const price = parseFloat(req.body.price);
      const stock = parseInt(req.body.stock);
      const categoryId = parseInt(req.body.categoryId);
      
      // Check for NaN values from failed conversions
      if (isNaN(price) || isNaN(stock) || isNaN(categoryId)) {
        throw new Error("Invalid numeric values. Price, stock, and categoryId must be numbers.");
      }
      
      const request: ProductCreateRequest = {
        name: req.body.name,
        description: req.body.description,
        price: price,
        stock: stock,
        categoryId: categoryId,
        image: req.file
      };

      const response = await ProductService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const price = parseFloat(req.body.price);
      const stock = parseInt(req.body.stock);
      const categoryId = parseInt(req.body.categoryId);

      // Check for NaN values from failed conversions
      if (isNaN(price) || isNaN(stock) || isNaN(categoryId)) {
        throw new Error("Invalid numeric values. Price, stock, and categoryId must be numbers.");
      }

      const request: ProductUpdateRequest = {
        name: req.body.name,
        description: req.body.description,
        price: price,
        stock: stock,
        categoryId: categoryId,
        image: req.file
      };

      const response = await ProductService.update(id, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await ProductService.delete(id);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}