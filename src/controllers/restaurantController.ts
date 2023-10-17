import { Request, Response } from 'express';
import { RestaurantService } from '../use-cases/restaurant';

export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  async addRestaurant(req: Request, res: Response) {
    try {
      const { idAdmin, name, address, category } = req.body;
      const restaurant = await this.restaurantService.addRestaurant(
        idAdmin,
        name,
        address,
        category
      );
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getRestaurant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantService.getRestaurantById(id);
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateRestaurant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedRestaurant = await this.restaurantService.updateRestaurant(
        id,
        updatedData
      );
      if (updatedRestaurant) {
        res.json(updatedRestaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteRestaurant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRestaurant = await this.restaurantService.deleteRestaurant(
        id
      );
      if (deletedRestaurant) {
        res.json(deletedRestaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
