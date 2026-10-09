import { Request, Response, NextFunction } from "express";
import { AnalyticsService } from "../services/analytics.service";

export class AnalyticsController {
    private analyticsService = new AnalyticsService();

    getDashboardStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this.analyticsService.getStats();
            res.status(200).json({ 
                success: true, 
                data: stats 
            });
        } catch (error) {
            next(error);
        }
    };
}