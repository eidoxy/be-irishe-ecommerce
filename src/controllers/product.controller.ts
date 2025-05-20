// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const getProducts = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const products = await prisma.product.findMany({ include: { Category: true } });
//       return res.json(products);
//     } catch (error) {
//       return res.status(500).json({ message: 'Gagal mengambil produk', error });
//     }
//   };

// export const getProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await prisma.product.findUnique({
//       where: { id: req.params.id },
//       include: { Category: true }
//     });

//     if (!product) {
//       return res.status(404).json({ message: 'Produk tidak ditemukan' });
//     }

//     return res.json(product);
//   } catch (error) {
//     return res.status(500).json({ message: 'Gagal mengambil produk', error });
//   }
// };

// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const category = await prisma.category.findUnique({
//       where: { id: req.body.category_id },
//     });

//     if (!category) {
//       return res.status(400).json({ message: "Kategori tidak ditemukan" });
//     }

//     const product = await prisma.product.create({
//       data: {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         stock: req.body.stock,
//         image_url: req.body.image_url,
//         Category: {
//           connect: { id: req.body.category_id },
//         },
//       },
//     });

//     return res.status(201).json(product);
//   } catch (error) {
//     return res.status(500).json({ message: "Terjadi kesalahan saat membuat produk", error });
//   }
// };

// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const existingProduct = await prisma.product.findUnique({
//       where: { id: req.params.id },
//     });

//     if (!existingProduct) {
//       return res.status(404).json({ message: 'Produk tidak ditemukan' });
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id: req.params.id },
//       data: {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         stock: req.body.stock,
//         image_url: req.body.image_url,
//         Category: {
//           connect: { id: req.body.category_id },
//         },
//       },
//     });

//     return res.json(updatedProduct);
//   } catch (error) {
//     return res.status(500).json({ message: 'Gagal mengubah produk', error });
//   }
// };

// export const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     await prisma.product.delete({
//       where: { id: req.params.id },
//     });
//     return res.json({ message: 'Produk berhasil dihapus' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Gagal menghapus produk', error });
//   }
// };


