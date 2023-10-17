import { UserRepository } from '../../repositories/userRepository';
import { User } from '../../entities/user';

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
    //TODO Hashing contraseñas
    const user = new User(name, email, password, role, address);
    return this.userRepository.createUser(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
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
