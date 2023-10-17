import mongoose from 'mongoose';

import { User } from '@ngneat/falso';
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
      role: 'customer',
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
    }),
  ];
  await UserModel.insertMany(users);
}

async function createRestaurants() {
  const restaurants = [
    new RestaurantModel({ name: 'Tasty Pizza', address: '123 Pizza Street' }),
    new RestaurantModel({
      name: 'Burger Delight',
      address: '456 Burger Avenue',
    }),
    new RestaurantModel({ name: 'Pasta Paradise', address: '789 Pasta Road' }),
    new RestaurantModel({ name: 'Sushi World', address: '101 Sushi Lane' }),
    new RestaurantModel({ name: 'Salad Bar', address: '102 Salad Blvd' }),
  ];
  await RestaurantModel.insertMany(restaurants);
}

async function createProducts(restaurantIds: string[]) {
  if (!restaurantIds || restaurantIds.length === 0) {
    throw new Error('No restaurant IDs available to create products.');
  }
  const products = [
    new ProductModel({
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza with pepperoni',
      price: 10.99,
      restaurantId: restaurantIds[0],
    }),
    new ProductModel({
      name: 'Cheeseburger',
      description: 'Juicy burger with cheese',
      price: 7.99,
      restaurantId: restaurantIds[1],
    }),
    new ProductModel({
      name: 'Spaghetti Carbonara',
      description: 'Pasta with cream and bacon',
      price: 8.99,
      restaurantId: restaurantIds[2],
    }),
    new ProductModel({
      name: 'California Roll',
      description: 'Popular sushi roll',
      price: 5.99,
      restaurantId: restaurantIds[3],
    }),
    new ProductModel({
      name: 'Caesar Salad',
      description: 'Salad with lettuce, croutons, and Caesar dressing',
      price: 6.99,
      restaurantId: restaurantIds[4],
    }),
  ];
  await ProductModel.insertMany(products);
}

// src/scripts/populate.ts

async function createOrders(userIds: string[], productIds: string[]) {
  const products = await ProductModel.find();

  const calculateTotalForOrder = (productIds: string[]) => {
    return productIds.reduce((sum, id) => {
      const product = products.find((p) => p._id.toString() === id);
      return sum + (product ? product.price : 0);
    }, 0);
  };

  const orders = [
    {
      userId: userIds[0],
      restaurantId: productIds[0],
      productIds: [productIds[0], productIds[1]],
      total: calculateTotalForOrder([productIds[0], productIds[1]]),
    },
    {
      userId: userIds[1],
      restaurantId: productIds[1],
      productIds: [productIds[1], productIds[2]],
      total: calculateTotalForOrder([productIds[1], productIds[2]]),
    },
    {
      userId: userIds[2],
      restaurantId: productIds[2],
      productIds: [productIds[2], productIds[3]],
      total: calculateTotalForOrder([productIds[2], productIds[3]]),
    },
    {
      userId: userIds[3],
      restaurantId: productIds[3],
      productIds: [productIds[3], productIds[4]],
      total: calculateTotalForOrder([productIds[3], productIds[4]]),
    },
    {
      userId: userIds[4],
      restaurantId: productIds[4],
      productIds: [productIds[4], productIds[0]],
      total: calculateTotalForOrder([productIds[4], productIds[0]]),
    },
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

  await createUsers();
  await createRestaurants();
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
