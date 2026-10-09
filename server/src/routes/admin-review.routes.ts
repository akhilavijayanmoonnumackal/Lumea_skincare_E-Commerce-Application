import { Router } from "express";
import { AdminReviewController } from "../controllers/admin-review.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AdminReviewController();

router.get('/', verifyAdminAuth, controller.getAllReviews);
router.delete('/:id', verifyAdminAuth, controller.deleteReview);

export default router;