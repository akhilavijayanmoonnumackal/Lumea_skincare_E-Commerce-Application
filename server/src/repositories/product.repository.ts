import PRODUCT from "../models/product/product";
import { IProduct } from "../models/product/product-model";

export class ProductRepository {
    async findAll(): Promise<IProduct[]> {
        return PRODUCT.find({ documentStatus: true }).sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IProduct | null> {
        return PRODUCT.findById(id);
    }

    async create(productData: Partial<IProduct>): Promise<IProduct> {
        const product = new PRODUCT(productData);
        return product.save();
    }

    async update(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, updateData, { new: true });
    }

    async updateStock(id: string, stockCount: number): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, { stockCount}, { new: true });
    }

    async delete(id: string): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, { documentStatus: false }, { new: true });
    }
}