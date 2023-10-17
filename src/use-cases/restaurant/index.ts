import { RestaurantRepository } from '../../repositories/restaurantRepository';
import { Restaurant } from '../../entities/restaurant';

export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async addRestaurant(
    idAdmin: string,
    name: string,
    address: string,
    category: string,
    isDeleted?: boolean
  ): Promise<Restaurant> {
    const restaurant = new Restaurant(
      idAdmin,
      name,
      address,
      category,
      isDeleted
    );
    return this.restaurantRepository.createRestaurant(restaurant);
  }

  async getRestaurantById(id: string): Promise<Restaurant | null> {
    return this.restaurantRepository.getRestaurantById(id);
  }

  async updateRestaurant(
    id: string,
    name?: string,
    address?: string
  ): Promise<Restaurant | null> {
    return this.restaurantRepository.updateRestaurant(id, { name, address });
  }

  async deleteRestaurant(id: string): Promise<Restaurant | null> {
    return this.restaurantRepository.deleteRestaurant(id);
  }
}
