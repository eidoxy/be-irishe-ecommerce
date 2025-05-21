import { z, ZodType } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const multerFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  destination: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
  buffer: z.instanceof(Buffer).optional(),
}).refine(
  (file) => file.size <= MAX_IMAGE_SIZE,
  `Max image size is 5MB.`
).refine(
  (file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
  `Accepted image types are: ${ACCEPTED_IMAGE_TYPES.join(", ")}`
);

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
