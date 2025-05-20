// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await hash('admin123', 10);

  // Seed Admin
  await prisma.admin.create({
    data: {
      id: 1,
      username: 'superadmin',
      name: 'Admin Utama',
      email: 'admin@example.com',
      password: hashedPassword,
      updatedAt: new Date() 
    },
  });

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { 
        id: 1, 
        name: 'Electronics', 
        description: 'Gadgets and devices',
        updatedAt: new Date() // Tambahkan ini
      },
      { 
        id: 2, 
        name: 'Clothing', 
        description: 'Fashion items',
        updatedAt: new Date() // Tambahkan ini
      },
    ],
  });

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Smartphone X',
        description: 'Latest smartphone',
        price: 599.99,
        stock: 100,
        categoryId: 1,
        imageUrl: 'https://example.com/phone.jpg',
        updatedAt: new Date() 
      },
      {
        id: 2,
        name: 'T-Shirt',
        description: 'Cotton t-shirt',
        price: 19.99,
        stock: 50,
        categoryId: 1,
        imageUrl: 'https://example.com/shirt.jpg',
        updatedAt: new Date() 
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });