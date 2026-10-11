import { ReviewRepository } from "../repositories/review.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import REVIEW from "../models/review/review.js";
import { IReview } from "../models/review/review-model.js";

export class ReviewService {
    private reviewRepository = new ReviewRepository();
    private productRepository = new ProductRepository();
    private orderRepository = new OrderRepository();

    async createReview(userId: string, productId: string, rating: number, comment: string): Promise<IReview> {
        // 1. Verify product exists
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // 2. Verify that the user has purchased this product (checking user's orders)
        const userOrders = await this.orderRepository.findByUser(userId);
        const hasPurchased = userOrders.some(order => 
            (order.orderItems || []).some((item: any) => {
                const prod = item.product;
                const itemProductId = prod && typeof prod === 'object' 
                    ? (prod._id || prod.id)?.toString() 
                    : prod?.toString();
                return itemProductId === productId;
            })
        );

        if (!hasPurchased) {
            throw new Error("You can only review products you have purchased");
        }

        // 3. Check if user already reviewed this product
        const existingReview = await this.reviewRepository.findByUserAndProduct(userId, productId);
        if (existingReview) {
            throw new Error("You have already reviewed this product");
        }

        // 4. Create review
        return this.reviewRepository.create({
            user: userId as any,
            product: productId as any,
            rating,
            comment
        });
    }

    async getProductReviews(productId: string): Promise<IReview[]> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        return this.reviewRepository.findByProduct(productId);
    }
}