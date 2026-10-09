import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
    private orderService = new OrderService();

    // Admin: Get all orders across all users
    getAllOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json({ 
                success: true, 
                count: orders.length, 
                data: orders 
            });
        } catch (error) {
            next(error);
        }
    };

    // Admin: Get a single order by ID
    getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = req.params.id as string;
            const order = await this.orderService.getOrderById(orderId);

            if (!order) {
                res.status(404).json({ success: false, message: 'Order not found' });
                return;
            }

            res.status(200).json({ success: true, data: order });
        } catch (error) {
            next(error);
        }
    };

    // Admin: Update order fulfillment status (Pending, Processing, Shipped, Delivered, Cancelled)
    updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = req.params.id as string;
            const { orderStatus, paymentStatus } = req.body;

            const updatedOrder = await this.orderService.updateOrderStatus(orderId, { orderStatus, paymentStatus });

            if (!updatedOrder) {
                res.status(404).json({ success: false, message: 'Order not found' });
                return;
            }

            res.status(200).json({ 
                success: true, 
                message: 'Order status updated successfully', 
                data: updatedOrder 
            });
        } catch (error) {
            next(error);
        }
    };
}