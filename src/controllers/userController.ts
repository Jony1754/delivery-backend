import { Request, Response } from 'express';
import { UserService } from '../use-cases/user';
import { validObjectId } from '../utils/validObjectId';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export class UserController {
  constructor(private userService: UserService) {
    console.log('userService in constructor: ', userService);
    this.userService = userService;
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, address } = req.body;
      const user = await this.userService.registerUser(
        name,
        email,
        password,
        role,
        address
      );
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (validObjectId(id)) {
        const user = await this.userService.getUserById(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } else {
        const user = await this.userService.getUserByEmail(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.verifyCredentials(email, password);
      console.log('user in verify credentials: ', user);
      if (!user) {
        return res.status(400).send('Invalid email or password.');
      }

      const token = jwt.sign(
        { _id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY!
      );
      res.send(token);
    } catch (error) {
      console.log('Error in login: ', error);
      res.status(500).send('Internal server error.');
    }
  };

  getUserByEmail = async (req: Request, res: Response) => {
    console.log('this.userService: ', this.userService);
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log('Error in getUserByEmail: ', error);
      res.status(400).json({ message: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      console.log('id at the method call: ', id);
      console.log('updatedData at the method call: ', updatedData);
      console.log('req.body at the method call: ', req.body);
      const updatedUser = await this.userService.updateUser(id, updatedData);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await this.userService.deleteUser(id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
