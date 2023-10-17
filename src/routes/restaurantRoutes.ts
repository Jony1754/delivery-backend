import express from 'express';
import { RestaurantController } from '../controllers/restaurantController';
import { RestaurantRepository } from '../repositories/restaurantRepository';
import { RestaurantService } from '../use-cases/restaurant';

const restaurantRepository = new RestaurantRepository();
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

const router = express.Router();

router.post('/', restaurantController.addRestaurant);
router.get('/:id', restaurantController.getRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

export default router;
