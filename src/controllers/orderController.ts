import { Request, Response } from 'express';
import { OrderService } from '../use-cases/order';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async placeOrder(req: Request, res: Response) {
    try {
      const { userId, restaurantId, productIds } = req.body;
      const order = await this.orderService.placeOrder(
        userId,
        restaurantId,
        productIds
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedOrder = await this.orderService.updateOrder(id, updatedData);
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedOrder = await this.orderService.deleteOrder(id);
      if (deletedOrder) {
        res.json(deletedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
