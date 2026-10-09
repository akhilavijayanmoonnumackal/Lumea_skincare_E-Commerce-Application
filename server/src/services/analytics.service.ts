import { AnalyticsRepository } from "../repositories/analytics.repository";

export class AnalyticsService {
    private analyticsRepository = new AnalyticsRepository();

    async getStats() {
        return this.analyticsRepository.getDashboardStats();
    }
}