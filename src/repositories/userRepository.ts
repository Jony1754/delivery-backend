import { UserModel } from '../models/userModel';
import { User } from '../entities/user';

export class UserRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find();
    console.log('users directly from mongodb: ', users);
    return users.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.password,
          user.role,
          user.address,
          user.isDeleted,
          user.id
        )
    );
  }
  async createUser(user: User): Promise<User> {
    const newUser = await UserModel.create(user);
    return new User(
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.address,
      newUser.isDeleted,
      newUser.id
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return new User(
      user.name,
      user.email,
      user.password,
      user.role,
      user.address,
      user.isDeleted,
      user.id
    );
  }

  async updateUser(
    id: string,
    updatedData: Partial<User>
  ): Promise<User | null> {
    console.log('updatedData: ', updatedData);
    const user = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log('user at findByIdAndUpdate: ', user);
    if (!user) return null;
    return new User(
      user.name,
      user.email,
      user.password,
      user.role,
      user.address,
      user.isDeleted,
      user.id
    );
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return null;
    return new User(
      user.name,
      user.email,
      user.password,
      user.role,
      user.address,
      user.isDeleted,
      user.id
    );
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return new User(
      user.name,
      user.email,
      user.password,
      user.role,
      user.address,
      user.isDeleted,
      user.id
    );
  }
}
