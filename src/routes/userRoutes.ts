import express from 'express';
import { UserController } from '../controllers/userController';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../use-cases/user';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
console.log('userRepository: ', userRepository);
console.log('userService: ', userService);
const userController = new UserController(userService);

const router = express.Router();
// TODO: Test user flow
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:email', userController.getUserByEmail);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
