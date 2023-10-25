import { Request, Response } from 'express';
import { ProductService } from '../use-cases/product';

export class ProductController {
  constructor(private productService: ProductService) {}

  getProductsByRestaurantAndCategory = async (req: Request, res: Response) => {
    try {
      const restaurantId = req.query.restaurantId
        ? String(req.query.restaurantId)
        : undefined;
      const category = req.query.category
        ? String(req.query.category)
        : undefined;

      const products =
        await this.productService.getProductsByRestaurantAndCategory(
          restaurantId,
          category
        );
      res.json(products);
    } catch (error) {
      console.error('Error at getProductsByRestaurantAndCategory: ', error);
      res.status(400).json({ message: error.message });
    }
  };

  addProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, category, restaurantId } = req.body;
      const product = await this.productService.addProduct(
        name,
        description,
        price,
        category,
        restaurantId
      );
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  // El endpoint retorna los datos de los productos que correspondan a el  restaurante y/o categoría proveída
  getAllProducts = async (req: Request, res: Response) => {
    try {
      const { restaurantId, categoryId } = req.query;
      const products = await this.productService.getAllProducts(
        restaurantId as string,
        categoryId as string
      );
      res.json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedProduct = await this.productService.updateProduct(
        id,
        updatedData
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedProduct = await this.productService.deleteProduct(id);
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
