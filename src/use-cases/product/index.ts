import { ProductRepository } from '../../repositories/productRepository';
import { Product } from '../../entities/product';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProductsByRestaurantAndCategory(
    restaurantId: string,
    category: string
  ): Promise<Product[]> {
    return this.productRepository.getProductsByRestaurantAndCategory(
      restaurantId,
      category
    );
  }

  async addProduct(
    name: string,
    description: string,
    price: number,
    category: string,
    restaurantId: string
  ): Promise<Product> {
    const product = new Product(
      name,
      description,
      price,
      category,
      restaurantId
    );
    return this.productRepository.createProduct(product);
  }

  async getAllProducts(
    restaurantId?: string,
    categoryId?: string
  ): Promise<Product[]> {
    return this.productRepository.getAllProducts(restaurantId, categoryId);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.getProductById(id);
  }

  async updateProduct(
    id: string,
    name?: string,
    description?: string,
    price?: number,
    restaurantId?: string
  ): Promise<Product | null> {
    return this.productRepository.updateProduct(id, {
      name,
      description,
      price,
      restaurantId,
    });
  }

  async deleteProduct(id: string): Promise<Product | null> {
    return this.productRepository.deleteProduct(id);
  }
}
