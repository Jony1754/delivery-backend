import { OrderRepository } from '../../repositories/orderRepository';
import { ProductRepository } from '../../repositories/productRepository';
import { Order } from '../../entities/order';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}
  async getOrdersByFilters(filters: any): Promise<Order[]> {
    return this.orderRepository.getOrdersByFilters(filters);
  }

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
    const order = new Order(userId, restaurantId, products, total, 'Creado');
    return this.orderRepository.createOrder(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.getOrderById(id);
  }

  async updateOrder(
    id: string,
    updatedData: Partial<Order>
  ): Promise<Order | null> {
    const order = await this.orderRepository.getOrderById(id);
    if (order && order.currentStatus === 'Enviado') {
      throw new Error(
        'No se puede actualizar un pedido que ya ha sido enviado.'
      );
    }
    return this.orderRepository.updateOrder(id, updatedData);
  }

  async deleteOrder(id: string): Promise<Order | null> {
    return this.orderRepository.deleteOrder(id);
  }
}
