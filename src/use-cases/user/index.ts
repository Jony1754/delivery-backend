import { UserRepository } from '../../repositories/userRepository';
import { User } from '../../entities/user';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
  async registerUser(
    name: string,
    email: string,
    password: string,
    role: string,
    address: string
  ): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User(name, email, hashedPassword, role, address);
    return this.userRepository.createUser(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async verifyCredentials(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    return user;
  }

  async updateUser(
    id: string,
    updatedData: Partial<User>
  ): Promise<User | null> {
    return this.userRepository.updateUser(id, updatedData);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userRepository.deleteUser(id);
  }
}
