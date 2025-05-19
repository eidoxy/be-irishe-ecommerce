import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts as any);
router.get('/:id', getProduct as any);
router.post('/', createProduct as any);
router.put('/:id', updateProduct as any);
router.delete('/:id', deleteProduct as any);

export default router;