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
      id: 'admin1',
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
        id: 'cat1', 
        name: 'Electronics', 
        description: 'Gadgets and devices',
        updatedAt: new Date() // Tambahkan ini
      },
      { 
        id: 'cat2', 
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
        id: 'prod1',
        name: 'Smartphone X',
        description: 'Latest smartphone',
        price: 599.99,
        stock: 100,
        category_id: 'cat1',
        image_url: 'https://example.com/phone.jpg',
        updatedAt: new Date() 
      },
      {
        id: 'prod2',
        name: 'T-Shirt',
        description: 'Cotton t-shirt',
        price: 19.99,
        stock: 50,
        category_id: 'cat2',
        image_url: 'https://example.com/shirt.jpg',
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