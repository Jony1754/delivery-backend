import { OrderModel } from '../models/orderModel';
import { Order } from '../entities/order';

export class OrderRepository {
  async createOrder(order: Order): Promise<Order> {
    const newOrder = await OrderModel.create(order);
    return new Order(
      newOrder.userId.toString(),
      newOrder.restaurantId.toString(),
      newOrder.products.map((product) => ({
        productId: product.productId.toString(),
        quantity: product.quantity,
      })),
      newOrder.total,
      newOrder.currentStatus
    );
  }
  async getOrdersByFilters(filters: any): Promise<Order[]> {
    const orders = await OrderModel.find(filters);
    return orders.map(
      (order) =>
        new Order(
          order.userId.toString(),
          order.restaurantId.toString(),
          order.products.map((product) => ({
            productId: product.productId.toString(),
            quantity: product.quantity,
          })),
          order.total,
          order.currentStatus
        )
    );
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await OrderModel.findById(id);
    if (!order) return null;
    return new Order(
      order.userId.toString(),
      order.restaurantId.toString(),
      order.products.map((product) => ({
        productId: product.productId.toString(),
        quantity: product.quantity,
      })),
      order.total,
      order.currentStatus
    );
  }

  async updateOrder(
    id: string,
    updatedData: Partial<Order>
  ): Promise<Order | null> {
    const order = await OrderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!order) return null;
    return new Order(
      order.userId.toString(),
      order.restaurantId.toString(),
      order.products.map((product) => ({
        productId: product.productId.toString(),
        quantity: product.quantity,
      })),
      order.total,
      order.currentStatus
    );
  }

  async deleteOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!order) return null;
    return new Order(
      order.userId.toString(),
      order.restaurantId.toString(),
      order.products.map((product) => ({
        productId: product.productId.toString(),
        quantity: product.quantity,
      })),
      order.total,
      order.currentStatus
    );
  }
}
