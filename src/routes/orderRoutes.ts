import express from 'express';
import { OrderController } from '../controllers/orderController';
import { OrderRepository } from '../repositories/orderRepository';
import { ProductRepository } from '../repositories/productRepository';
import { OrderService } from '../use-cases/order';

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const orderService = new OrderService(orderRepository, productRepository);
const orderController = new OrderController(orderService);

const router = express.Router();

router.post('/', orderController.placeOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
