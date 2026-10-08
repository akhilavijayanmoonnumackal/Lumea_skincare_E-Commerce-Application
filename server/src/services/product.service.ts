import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../models/product/product-model";

export class ProductService {
    private productRepository = new ProductRepository();

    async getAllProducts() {
        return this.productRepository.findAll();
    }

    async getProductById(id: string) {
        const product = await this.productRepository.findById(id);
        if(!product) throw { statusCode: 404, message: 'Product not found' };
        return product;
    }

    async createProduct(data: Partial<IProduct>) {
        return this.productRepository.create(data);
    }

    async upadateProduct(id: string, data: Partial<IProduct>) {
        const product = await this.productRepository.update(id, data);
        if(!product) throw { statusCode: 404, message: 'Product not fouund for update' };
        return product;
    }

    async updateStock(id: string, stockCount: number) {
        const product = await this.productRepository.updateStock(id, stockCount);
        if(!product) throw { statusCode: 404, message: 'Product not found for stock adjustment' };
        return product;
    }

    async deleteProduct(id: string) {
        const product = await this.productRepository.delete(id);
        if(!product) throw { statusCode: 404, message: 'Product not found for deletion' };
        return { message: 'Product deleted successfully' };
    }
}