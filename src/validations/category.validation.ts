import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE : ZodType = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional(),
  })

  static readonly UPDATE : ZodType = z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().optional(),
  })
}