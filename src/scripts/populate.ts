import mongoose from 'mongoose';
import { User } from '../entities/user';
import { UserModel } from '../models/userModel';
import { Product } from '../entities/product';
import { ProductModel } from '../models/productModel';
import { Restaurant } from '../entities/restaurant';
import { RestaurantModel } from '../models/restaurantModel';
import { Order } from '../entities/order';
import { OrderModel } from '../models/orderModel';

const MONGO_URI = 'mongodb://127.0.0.1:27017/backend';

async function createUsers() {
  const users = [
    new UserModel({
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'alice123',
      role: 'admin',
      address: '123 Main Street',
    }),
    new UserModel({
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'bob123',
      role: 'admin',
      address: '456 Main Street',
    }),
    new UserModel({
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      password: 'charlie123',
      role: 'customer',
      address: '789 Main Street',
    }),
    new UserModel({
      name: 'David Clark',
      email: 'david@example.com',
      password: 'david123',
      role: 'customer',
      address: '101 Main Street',
    }),
    new UserModel({
      name: 'Eva White',
      email: 'eva@example.com',
      password: 'eva123',
      role: 'customer',
      address: '111 Main Street',
    }),
  ];
  await UserModel.insertMany(users);
  return users;
}

// For testing purposes the admins array has ony 2 admins

//  idAdmin: { type: String, required: true },
//   name: { type: String, required: true, unique: true },
//   address: { type: String, required: true },
//   category: { type: String, required: true },
//   isDeleted: { type: Boolean, default: false },
// Remove the following line since UserModel is already imported above
// import { UserModel } from '../models/userModel';

async function createRestaurants(admins: User[]) {
  const restaurants = [
    new RestaurantModel({
      idAdmin: admins[0].id,
      name: 'Pizza Planet',
      address: '123 Main Street',
      category: 'Italian',
    }),
    new RestaurantModel({
      idAdmin: admins[1].id,
      name: 'Burger Palace',
      address: '456 Main Street',
      category: 'American',
    }),
    new RestaurantModel({
      idAdmin: admins[1].id,
      name: 'Pasta Place',
      address: '789 Main Street',
      category: 'Italian',
    }),
    new RestaurantModel({
      idAdmin: admins[0].id,
      name: 'Sushi Central',
      address: '101 Main Street',
      category: 'Japanese',
    }),
  ];

  await RestaurantModel.insertMany(restaurants);
}

async function createProducts(restaurantIds: string[]) {
  if (!restaurantIds || restaurantIds.length === 0) {
    throw new Error('No restaurant IDs available to create products.');
  }
  console.log('restaurantIds: ', restaurantIds);
  const products = [
    new ProductModel({
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza with pepperoni',
      price: 10.99,
      category: 'Italian',
      restaurantId: restaurantIds[0],
    }),
    new ProductModel({
      name: 'Cheeseburger',
      description: 'Juicy burger with cheese',
      price: 7.99,
      category: 'American',
      restaurantId: restaurantIds[1],
    }),
    new ProductModel({
      name: 'Spaghetti Carbonara',
      description: 'Pasta with cream and bacon',
      price: 8.99,
      category: 'Italian',
      restaurantId: restaurantIds[2],
    }),
    new ProductModel({
      name: 'California Roll',
      description: 'Popular sushi roll',
      price: 5.99,
      category: 'Japanese',
      restaurantId: restaurantIds[3],
    }),
    new ProductModel({
      name: 'Caesar Salad',
      description: 'Salad with lettuce, croutons, and Caesar dressing',
      price: 6.99,
      category: 'American',
      restaurantId: restaurantIds[3],
    }),
  ];
  await ProductModel.insertMany(products);
}

async function createOrders(userIds: string[], productIds: string[]) {
  const products = await ProductModel.find();

  const calculateTotalForOrder = (productIds: string[]) => {
    return productIds.reduce((sum, id) => {
      const product = products.find((p) => p._id.toString() === id);
      return sum + (product ? product.price : 0);
    }, 0);
  };

  const orders = [
    new OrderModel({
      userId: userIds[0],
      restaurantId: products[0].restaurantId,
      products: [
        { productId: productIds[0], quantity: 2 },
        { productId: productIds[1], quantity: 1 },
      ],
      total: calculateTotalForOrder([productIds[0], productIds[1]]),
    }),
    new OrderModel({
      userId: userIds[1],
      restaurantId: products[1].restaurantId,
      products: [
        { productId: productIds[1], quantity: 1 },
        { productId: productIds[2], quantity: 1 },
      ],
      total: calculateTotalForOrder([productIds[1], productIds[2]]),
    }),
    new OrderModel({
      userId: userIds[2],
      restaurantId: products[2].restaurantId,
      products: [
        { productId: productIds[2], quantity: 1 },
        { productId: productIds[3], quantity: 1 },
      ],
      total: calculateTotalForOrder([productIds[2], productIds[3]]),
    }),
    new OrderModel({
      userId: userIds[3],
      restaurantId: products[3].restaurantId,
      products: [
        { productId: productIds[3], quantity: 1 },
        { productId: productIds[4], quantity: 1 },
      ],
      total: calculateTotalForOrder([productIds[3], productIds[4]]),
    }),
    new OrderModel({
      userId: userIds[4],
      restaurantId: products[4].restaurantId,
      products: [
        { productId: productIds[4], quantity: 1 },
        { productId: productIds[0], quantity: 1 },
      ],
      total: calculateTotalForOrder([productIds[4], productIds[0]]),
    }),
  ];

  await OrderModel.insertMany(orders);
}

async function populateDB() {
  await mongoose.connect(MONGO_URI);

  // Clear existing data
  await UserModel.deleteMany({});
  await RestaurantModel.deleteMany({});
  await ProductModel.deleteMany({});
  await OrderModel.deleteMany({});

  const usersResult = await createUsers();
  const admins = usersResult.filter((u) => u.role === 'admin');

  const adminUsers = admins.map(
    (u) =>
      new User(
        u.name,
        u.email,
        u.password,
        u.role,
        u.address,
        u.isDeleted,
        u.id
      )
  );
  await createRestaurants(adminUsers);
  const restaurants = await RestaurantModel.find();
  await createProducts(restaurants.map((r) => r._id.toString()));
  const users = await UserModel.find();
  const products = await ProductModel.find();
  await createOrders(
    users.map((u) => u._id.toString()),
    products.map((p) => p._id.toString())
  );

  console.log('Database populated successfully with fixed data!');
  await mongoose.disconnect();
}

populateDB().catch((error) => {
  console.error('Error populating the database:', error);
  mongoose.disconnect();
});
