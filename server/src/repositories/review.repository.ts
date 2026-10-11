import REVIEW from "../models/review/review.js";
import { IReview } from "../models/review/review-model.js";

export class ReviewRepository {
    async create(reviewData: Partial<IReview>): Promise<IReview> {
        const review = new REVIEW(reviewData);
        return (await review.save()).populate('user', 'name email');
    }

    async findByProduct(productId: string): Promise<IReview[]> {
        return REVIEW.find({ product: productId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
    }

    async findByUserAndProduct(userId: string, productId: string): Promise<IReview | null> {
        return REVIEW.findOne({ user: userId, product: productId });
    }
}