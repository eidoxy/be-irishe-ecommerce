import express from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import router from '../routes';

export const web = express();
web.use(express.json());
web.use('/api', router);
web.use(errorHandler);