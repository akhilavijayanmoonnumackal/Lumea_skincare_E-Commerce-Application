import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AnalyticsController();

router.get('/analytics', verifyAdminAuth, controller.getDashboardStats);

export default router;