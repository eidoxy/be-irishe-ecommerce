import { AdminController } from '../controllers/admin.controller';
import { Router } from 'express';

const publicRouter = Router();
// const privateRouter = Router();

publicRouter.post('/register', AdminController.register);

const adminRouter = Router();
adminRouter.use(publicRouter);
// adminRouter.use(privateRouter);

export default adminRouter;