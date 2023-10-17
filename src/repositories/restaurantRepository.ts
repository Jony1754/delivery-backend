import { RestaurantModel } from '../models/restaurantModel';
import { Restaurant } from '../entities/restaurant';

export class RestaurantRepository {
  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    const newRestaurant = await RestaurantModel.create(restaurant);
    return new Restaurant(
      newRestaurant.idAdmin,
      newRestaurant.name,
      newRestaurant.address,
      newRestaurant.category,
      newRestaurant.isDeleted,
      newRestaurant.id.toString()
    );
  }

  async getRestaurantById(id: string): Promise<Restaurant | null> {
    const restaurant = await RestaurantModel.findById(id);
    if (!restaurant) return null;
    return new Restaurant(
      restaurant.idAdmin,
      restaurant.name,
      restaurant.address,
      restaurant.category,
      restaurant.isDeleted,
      restaurant.id.toString()
    );
  }

  async updateRestaurant(
    id: string,
    updatedData: Partial<Restaurant>
  ): Promise<Restaurant | null> {
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!restaurant) return null;
    return new Restaurant(
      restaurant.idAdmin,
      restaurant.name,
      restaurant.address,
      restaurant.category,
      restaurant.isDeleted,
      restaurant.id.toString()
    );
  }

  async deleteRestaurant(id: string): Promise<Restaurant | null> {
    const restaurant = await RestaurantModel.findByIdAndDelete(id);
    if (!restaurant) return null;
    return new Restaurant(
      restaurant.idAdmin,
      restaurant.name,
      restaurant.address,
      restaurant.category,
      restaurant.isDeleted,
      restaurant.id.toString()
    );
  }
}
