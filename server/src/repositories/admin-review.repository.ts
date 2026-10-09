import REVIEW from "../models/review/review";
import { IReview } from "../models/review/review-model";

export class AdminReviewRepository {
    async findAllReviews(): Promise<IReview[]> {
        return REVIEW.find()
            .populate('product', 'name slug imageUrl')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
    }

    async deleteReview(id: string): Promise<IReview | null> {
        return REVIEW.findByIdAndDelete(id);
    }
}