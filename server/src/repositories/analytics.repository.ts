import ORDER from "../models/order/order";
import PRODUCT from "../models/product/product";
import USER from "../models/user/user";

export class AnalyticsRepository {
    async getDashboardStats() {
        const orderStats = await ORDER.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { 
                        $sum: { 
                            $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$totalPrice", 0] 
                        } 
                    }
                }
            }
        ]);

        const totalProducts = await PRODUCT.countDocuments({ documentStatus: true });

        const totalCustomers = await USER.countDocuments({ role: 'customer', isActive: true });

        const ordersByStatus = await ORDER.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = orderStats[0] || { totalOrders: 0, totalRevenue: 0 };

        return {
            revenue: stats.totalRevenue,
            totalOrders: stats.totalOrders,
            totalProducts,
            totalCustomers,
            ordersByStatus: ordersByStatus.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, {} as Record<string, number>)
        };
    }
}