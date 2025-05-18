import { Router } from 'express';
import healthRoutes from './health.routes';
import adminRouter from './admin.routes';

const router = Router();

router
  .use('/health', healthRoutes)
  .use('/admin', adminRouter);

export default router;