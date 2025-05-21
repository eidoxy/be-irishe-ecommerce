import { Router } from 'express';
import healthRoutes from './health.routes';
import adminRouter from './admin.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';

const router = Router();

router
  .use('/health', healthRoutes)
  .use('/admin', adminRouter)
  .use('/products', productRoutes)
  .use('/categories', categoryRoutes);

export default router;