import { AdminController } from '../controllers/admin.controller';
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';

const publicRouter = Router();
const privateRouter = Router();

publicRouter.post('/register', AdminController.register);
publicRouter.post('/login', AdminController.login);

privateRouter.use(authenticate);
privateRouter.get('/', AdminController.getAll);
privateRouter.get('/:id', AdminController.getById);
privateRouter.get('/update', AdminController.update);
privateRouter.delete('/delete/:id', AdminController.delete);


const adminRouter = Router();
adminRouter.use(publicRouter);
adminRouter.use(privateRouter);

export default adminRouter;