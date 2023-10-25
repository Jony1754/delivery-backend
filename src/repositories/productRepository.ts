import { ProductModel } from '../models/productModel';
import { Product } from '../entities/product';

export class ProductRepository {
  async createProduct(product: Product): Promise<Product> {
    const newProduct = await ProductModel.create(product);
    return new Product(
      newProduct.name,
      newProduct.description,
      newProduct.price,
      product.category,
      newProduct.restaurantId.toString()
    );
  }

  async getAllProducts(
    restaurantId?: string,
    categoryId?: string
  ): Promise<Product[]> {
    const query: any = { isDeleted: false };

    if (restaurantId) {
      query.restaurantId = restaurantId;
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    const products = await ProductModel.find(query);
    return products.map(
      (product) =>
        new Product(
          product.name,
          product.description,
          product.price,
          product.category,
          product.restaurantId.toString(),
          product.isDeleted,
          product.id
        )
    );
  }

  async getProductsByRestaurantAndCategory(
    restaurantId?: string,
    category?: string
  ): Promise<Product[]> {
    let filter: any = {};

    if (restaurantId) {
      filter.restaurantId = restaurantId;
    }

    if (category) {
      filter.category = new RegExp(category, 'i');
    }

    const products = await ProductModel.find(filter);

    return products.map(
      (product) =>
        new Product(
          product.name,
          product.description,
          product.price,
          product.category,
          product.restaurantId.toString(),
          product.isDeleted,
          product.id
        )
    );
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    if (!product) return null;
    return new Product(
      product.name,
      product.description,
      product.price,
      product.category,
      product.restaurantId.toString(),
      product.isDeleted,
      product.id
    );
  }

  async updateProduct(
    id: string,
    updatedData: Partial<Product>
  ): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!product) return null;
    return new Product(
      product.name,
      product.description,
      product.price,
      product.category,
      product.restaurantId.toString(),
      product.isDeleted,
      product.id
    );
  }

  async deleteProduct(id: string): Promise<Product | null> {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) return null;
    return new Product(
      product.name,
      product.description,
      product.price,
      product.category,
      product.restaurantId.toString(),
      product.isDeleted,
      product.id
    );
  }
}
