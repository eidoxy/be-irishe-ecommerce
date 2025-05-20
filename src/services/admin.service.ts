import { prismaClient } from "../config/db";
import bcrypt from "bcrypt";
import { ResponseError } from "../middlewares/responseError";
import { AdminCreateRequest, AdminResponse, toAdminResponse } from "../model/admin.model";
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
}