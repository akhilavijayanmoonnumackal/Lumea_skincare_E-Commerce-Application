import { AdminReviewRepository } from "../repositories/admin-review.repository";
import { IReview } from "../models/review/review-model";

export class AdminReviewService {
    private adminReviewRepository = new AdminReviewRepository();

    async getAllReviews(): Promise<IReview[]> {
        return this.adminReviewRepository.findAllReviews();
    }

    async removeReview(id: string): Promise<IReview | null> {
        return this.adminReviewRepository.deleteReview(id);
    }
}