import { AdminCreateRequest } from "../model/admin.model";
import { AdminService } from "../services/admin.service";
import { Request, Response, NextFunction } from "express";

export class AdminController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AdminCreateRequest = req.body as AdminCreateRequest;
      const response = await AdminService.register(request);
      res.status(200).json({
        status: "success",
        message: "Admin registered successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      const response = await AdminService.login(request);
      res.status(200).json({
        status: "success",
        message: "Admin logged in successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await AdminService.getById(id);
      res.status(200).json({
        status: "success",
        message: "Admin fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.getAll();
      res.status(200).json({
        status: "success",
        message: "Admins fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const request: AdminCreateRequest = req.body as AdminCreateRequest;
      const response = await AdminService.update(id, request);
      res.status(200).json({
        status: "success",
        message: "Admin updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await AdminService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Admin deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}