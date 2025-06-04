import { z, ZodType } from "zod";

export class AdminValidation {
  static readonly REGISTER : ZodType = z.object({
    username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string"
    }).min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    }).min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    }).email("Please provide a valid email address"),
    
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    }).min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
  });

  static readonly LOGIN : ZodType = z.object({
    usernameOrEmail: z.string({
      required_error: "Username or email is required",
      invalid_type_error: "Username or email must be a string"
    }).min(1, "Username or email cannot be empty"),
    
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    }).min(1, "Password cannot be empty"),
  });

  static readonly UPDATE : ZodType = z.object({
    username: z.string().min(3).max(20).optional(),
    name: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(20).optional(),
  });
}