import { Request, Response, NextFunction } from "express";
import { AdminReviewService } from "../services/admin-review.service";

export class AdminReviewController {
    private adminReviewService = new AdminReviewService();

    getAllReviews = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const reviews = await this.adminReviewService.getAllReviews();
            res.status(200).json({ 
                success: true, 
                count: reviews.length, 
                data: reviews 
            });
        } catch (error) {
            next(error);
        }
    };

    deleteReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const reviewId = req.params.id as string;
            const review = await this.adminReviewService.removeReview(reviewId);

            if (!review) {
                res.status(404).json({ success: false, message: 'Review not found' });
                return;
            }

            res.status(200).json({ 
                success: true, 
                message: 'Review removed successfully by admin' 
            });
        } catch (error) {
            next(error);
        }
    };
}