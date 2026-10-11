import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../models/product/product-model";

export class ProductPublicService {
    private productRepository = new ProductRepository();

    async getProducts(query: {
        category?: string;
        search?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        page?: string;
        limit?: string;
    }): Promise<{ products: IProduct[]; total: number; page: number; totalPages: number }> {
        const filter: any = {};

        if (query.category) {
            filter.category = query.category;
        }

        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } }
            ];
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.$gte = Number(query.minPrice);
            if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
        }

        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.max(1, Number(query.limit) || 10);
        const skip = (page - 1) * limit;


        let sort: any = { createdAt: -1 }; 
        if (query.sort === 'price-asc') sort = { price: 1 };
        if (query.sort === 'price-desc') sort = { price: -1 };
        if (query.sort === 'name') sort = { name: 1 };

        const { products, total } = await this.productRepository.findPublicProducts(filter, skip, limit, sort);

        return {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getProductBySlug(slug: string): Promise<IProduct | null> {
        const product = await this.productRepository.findBySlug(slug);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
}