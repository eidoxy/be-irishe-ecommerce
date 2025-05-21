import { z, ZodType } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
    description: z.string().optional(),
    stock: z.number().positive(),
    price: z.number().positive(),
    image: z
      .any()
      .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 5MB.`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype), `Accepted image types are: ${ACCEPTED_IMAGE_TYPES.join(", ")}`)
      .optional(),
    categoryId: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().optional(),
    stock: z.number().positive().optional(),
    price: z.number().positive().optional(),
    image: z
      .any()
      .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 5MB.`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype), `Accepted image types are: ${ACCEPTED_IMAGE_TYPES.join(", ")}`)
      .optional(),
    categoryId: z.number().positive().optional(),
  });
}
