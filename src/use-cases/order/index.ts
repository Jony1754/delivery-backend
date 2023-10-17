import { OrderRepository } from '../../repositories/orderRepository';
import { ProductRepository } from '../../repositories/productRepository';
import { Order } from '../../entities/order';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}

  async placeOrder(
    userId: string,
    restaurantId: string,
    products: { productId: string; quantity: number }[]
  ): Promise<Order> {
    // Lógica para calcular el total basado en los productos
    let total = 0;
    for (const pr of products) {
      const product = await this.productRepository.getProductById(pr.productId);
      if (product) {
        total += product.price;
      }
    }
    ``;
    const order = new Order(userId, restaurantId, products, total);
    return this.orderRepository.createOrder(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.getOrderById(id);
  }

  async updateOrder(
    id: string,
    userId?: string,
    restaurantId?: string,
    products?: { productId: string; quantity: number }[]
  ): Promise<Order | null> {
    return this.orderRepository.updateOrder(id, {
      userId,
      restaurantId,
      products,
    });
  }

  async deleteOrder(id: string): Promise<Order | null> {
    return this.orderRepository.deleteOrder(id);
  }
}
