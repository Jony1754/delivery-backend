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
      newOrder.total
    );
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await OrderModel.findById(id).populate('productIds');
    if (!order) return null;
    return new Order(
      order.userId.toString(),
      order.restaurantId.toString(),
      order.productIds.map((id) => id.toString()),
      order.total
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
      order.id.toString(),
      order.userId.toString(),
      order.restaurantId.toString(),
      order.productIds.map((id) => id.toString()),
      order.total
    );
  }

  async deleteOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) return null;
    return new Order(
      order.id.toString(),
      order.userId.toString(),
      order.restaurantId.toString(),
      order.productIds.map((id) => id.toString()),
      order.total
    );
  }
}
