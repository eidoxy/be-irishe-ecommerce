// import { PrismaClient } from '@prisma/client';
// import type { Prisma } from '@prisma/client';

// const prisma = new PrismaClient();

// // Get all products with their category
// export const getAllProducts = () => {
//   return prisma.product.findMany({
//     include: {
//       Category: true, // Include related category
//     },
//   });
// };

// // Get a single product by ID
// export const getProductById = (id: string) => {
//   return prisma.product.findUnique({
//     where: { id },
//     include: { Category: true },
//   });
// };

// // Create a new product
// export const createProduct = (data: Prisma.ProductCreateInput) => {
//   return prisma.product.create({ data });
// };

// // Update an existing product
// export const updateProduct = (id: string, data: Prisma.ProductUpdateInput) => {
//   return prisma.product.update({
//     where: { id },
//     data,
//   });
// };

// // Delete a product
// export const deleteProduct = (id: string) => {
//   return prisma.product.delete({
//     where: { id },
//   });
// };
