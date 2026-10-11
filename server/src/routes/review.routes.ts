import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new ReviewController();

router.post('/', verifyAuth, controller.createReview);
router.get('/products/:productId/reviews', controller.getProductReviews);

export default router;