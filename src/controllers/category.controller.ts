import { CategoryCreateRequest, CategoryUpdateRequest } from "../model/category.model";
import { CategoryService } from "../services/category.service";
import { Request, Response, NextFunction } from "express";

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getAll();
      res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await CategoryService.getById(id);
      res.status(200).json({
        status: "success",
        message: "Category retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CategoryCreateRequest = req.body as CategoryCreateRequest;
      const response = await CategoryService.create(request);
      res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const request: CategoryUpdateRequest = req.body as CategoryUpdateRequest;
      const response = await CategoryService.update(id, request);
      res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await CategoryService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
