import express from 'express';
import { ProductController } from '../controllers/productController';
import { ProductRepository } from '../repositories/productRepository';
import { ProductService } from '../use-cases/product';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.post('/', productController.addProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
