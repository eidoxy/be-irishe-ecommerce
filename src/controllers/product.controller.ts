import { ProductCreateRequest, ProductUpdateRequest } from "../model/product.model";
import { ProductService } from "../services/product.service";
import { Request, Response, NextFunction } from "express";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sortBy = req.query.sortBy as string || 'name';
      const sortOrder = req.query.sortOrder as string || 'asc';
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      const validSortFields = ['name', 'price', 'stock'];
      const validSortOrders = ['asc', 'desc'];
      
      if (!validSortFields.includes(sortBy)) {
        res.status(400).json({
          status: "error",
          message: `Invalid sortBy parameter. Valid options: ${validSortFields.join(', ')}`
        });
      }
      
      if (!validSortOrders.includes(sortOrder)) {
        res.status(400).json({
          status: "error",
          message: `Invalid sortOrder parameter. Valid options: ${validSortOrders.join(', ')}`
        });
      }

      if (categoryId !== undefined && (isNaN(categoryId) || categoryId <= 0)) {
        res.status(400).json({
          status: "error",
          message: "Invalid categoryId parameter. Must be a positive number."
        });
      }
      
      const response = await ProductService.getAll(sortBy, sortOrder as 'asc' | 'desc');
      res.status(200).json({
        status: "success",
        message: "Products retrieved successfully",
        data: response,
        meta: {
          sortBy,
          sortOrder,
          categoryId: categoryId || null,
          total: response.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const sortBy = req.query.sortBy as string || 'name';
      const sortOrder = req.query.sortOrder as string || 'asc';
      
      const validSortFields = ['name', 'price', 'stock'];
      const validSortOrders = ['asc', 'desc'];
      
      if (isNaN(categoryId) || categoryId <= 0) {
        res.status(400).json({
          status: "error",
          message: "Invalid categoryId parameter. Must be a positive number."
        });
      }

      if (!validSortFields.includes(sortBy)) {
        res.status(400).json({
          status: "error",
          message: `Invalid sortBy parameter. Valid options: ${validSortFields.join(', ')}`
        });
      }
      
      if (!validSortOrders.includes(sortOrder)) {
        res.status(400).json({
          status: "error",
          message: `Invalid sortOrder parameter. Valid options: ${validSortOrders.join(', ')}`
        });
      }

      const response = await ProductService.getAll(sortBy, sortOrder as 'asc' | 'desc', categoryId);
      res.status(200).json({
        status: "success",
        message: `Products in category ${categoryId} retrieved successfully`,
        data: response,
        meta: {
          sortBy,
          sortOrder,
          categoryId,
          total: response.length
        }
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
        status: "success",
        message: "Product retrieved successfully",
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
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
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
        status: "success",
        message: "Product updated successfully",
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
        status: "success",
        message: "Product deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}