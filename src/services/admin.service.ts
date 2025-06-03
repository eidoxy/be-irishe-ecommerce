import { prismaClient } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseError } from "../middlewares/responseError";
import {
  AdminResponse,
  AdminCreateRequest,
  AdminLoginRequest,
  AdminLoginResponse,
  toAdminResponse
} from "../model/admin.model";
import { createToken } from "../utils/token";
import { AdminValidation } from "../validations/admin.validation";
import { Validation } from "../validations/validation";

export class AdminService {
  static async register(request: AdminCreateRequest) : Promise<AdminResponse> {
    // validate the request
    const registerRequest = Validation.validate(AdminValidation.REGISTER, request)

    // check if the username already exists
    const totalUserWithSameUsername = await prismaClient.admin.count({
      where: {
        username: registerRequest.username
      }
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    // check if the email already exists
    const totalUserWithSameEmail = await prismaClient.admin.count({
      where: {
        email: registerRequest.email
      }
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, "Email already exists");
    }

    // hash the password
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // create the user admin
    const admin = await prismaClient.admin.create({
      data: registerRequest
    });

    return toAdminResponse(admin); 
  }

  static async login(request: AdminLoginRequest): Promise<AdminLoginResponse> {
    // validate the request
    const loginRequest = Validation.validate(AdminValidation.LOGIN, request);

    // find admin by username or email
    const admin = await prismaClient.admin.findFirst({
      where: {
        OR: [
          { username: loginRequest.usernameOrEmail },
          { email: loginRequest.usernameOrEmail }
        ]
      }
    });

    if (!admin) {
      throw new ResponseError(401, "Invalid credentials");
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(loginRequest.password, admin.password);
    if (!isPasswordValid) {
      throw new ResponseError(401, "Invalid credentials");
    }

    // generate JWT token using your token utility
    const token = createToken({
      id: admin.id,
      username: admin.username,
      email: admin.email
    });

    return {
      admin: toAdminResponse(admin),
      token: token
    };
  }

  static async getAll(): Promise<AdminResponse[]> {
    const admins = await prismaClient.admin.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return admins.map((admin) => toAdminResponse(admin));
  }

  static async getById(id: number): Promise<AdminResponse> {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: id
      }
    });

    if (!admin) {
      throw new ResponseError(404, "Admin not found");
    }

    return toAdminResponse(admin);
  }

  static async update(id: number, request: AdminCreateRequest): Promise<AdminResponse> {
    // validate the request
    const updateRequest = Validation.validate(AdminValidation.UPDATE, request);

    // check if admin exists
    const existingAdmin = await prismaClient.admin.findUnique({
      where: {
        id: id
      }
    });

    if (!existingAdmin) {
      throw new ResponseError(404, "Admin not found");
    }

    // check if username is taken by another admin
    if (updateRequest.username !== existingAdmin.username) {
      const totalUserWithSameUsername = await prismaClient.admin.count({
        where: {
          username: updateRequest.username,
          id: { not: id }
        }
      });

      if (totalUserWithSameUsername > 0) {
        throw new ResponseError(400, "Username already exists");
      }
    }

    // check if email is taken by another admin
    if (updateRequest.email !== existingAdmin.email) {
      const totalUserWithSameEmail = await prismaClient.admin.count({
        where: {
          email: updateRequest.email,
          id: { not: id }
        }
      });

      if (totalUserWithSameEmail > 0) {
        throw new ResponseError(400, "Email already exists");
      }
    }

    // hash password if provided and different
    let hashedPassword = existingAdmin.password;
    if (updateRequest.password && updateRequest.password !== existingAdmin.password) {
      hashedPassword = await bcrypt.hash(updateRequest.password, 10);
    }

    // update admin
    const updatedAdmin = await prismaClient.admin.update({
      where: {
        id: id
      },
      data: {
        username: updateRequest.username,
        name: updateRequest.name,
        email: updateRequest.email,
        password: hashedPassword
      }
    });

    return toAdminResponse(updatedAdmin);
  }

  static async delete(id: number): Promise<AdminResponse> {
    // check if admin exists
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: id
      }
    });

    if (!admin) {
      throw new ResponseError(404, "Admin not found");
    }

    // delete admin
    const deletedAdmin = await prismaClient.admin.delete({
      where: {
        id: id
      }
    });

    return toAdminResponse(deletedAdmin);
  }
}