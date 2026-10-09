import PRODUCT from "../models/product/product";
import { IProduct } from "../models/product/product-model";

export class ProductRepository {
    async findAll(): Promise<IProduct[]> {
        return PRODUCT.find({ documentStatus: true })
        .populate('category')
        .sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IProduct | null> {
        return PRODUCT.findById(id).populate('category');
    }

    async findByCategory(categoryId: string): Promise<IProduct[]> {
        return PRODUCT.find({ category: categoryId, documentStatus: true })
            .populate('category')
            .sort({ createdAt: -1 });
    }

    async create(productData: Partial<IProduct>): Promise<IProduct> {
        const product = new PRODUCT(productData);
        const savedProduct = await product.save();
        return savedProduct.populate('category');
    }

    async update(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, updateData, { new: true, inValidators: true })
        .populate('category');
    }

    async updateStock(id: string, stockCount: number): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, { stockCount}, { new: true });
    }

    async delete(id: string): Promise<IProduct | null> {
        return PRODUCT.findByIdAndUpdate(id, { documentStatus: false }, { new: true });
    }
}