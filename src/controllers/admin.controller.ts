import { AdminCreateRequest } from "../model/admin.model";
import { AdminService } from "../services/admin.service";
import { Request, Response, NextFunction } from "express";

export class AdminController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AdminCreateRequest = req.body as AdminCreateRequest;
      const response = await AdminService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}