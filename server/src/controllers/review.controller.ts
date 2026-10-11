import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/review.service";

export class ReviewController {
    private reviewService = new ReviewService();

    createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { productId, rating, comment } = req.body;

            if (!productId || !rating || !comment) {
                res.status(400).json({ success: false, message: "Product ID, rating, and comment are required" });
                return;
            }

            const review = await this.reviewService.createReview(userId, productId, Number(rating), comment);
            res.status(201).json({ success: true, message: "Review added successfully", data: review });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    getProductReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productIdParam = req.params.productId;
            const productId = Array.isArray(productIdParam) ? productIdParam[0] : productIdParam;

            if (!productId) {
                res.status(400).json({ success: false, message: "Product ID is required" });
                return;
            }

            const reviews = await this.reviewService.getProductReviews(productId);
            res.status(200).json({ success: true, data: reviews });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}