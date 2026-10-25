import { Request, Response, NextFunction } from "express";
import { CustomerOrderService } from "../services/customer-order.service";
import { RazorpayService } from "../services/razorpay.service";

export class CustomerOrderController {
    private customerOrderService = new CustomerOrderService();
    private razorpayService = new RazorpayService();

    createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { orderItems, shippingAddress, paymentMethod } = req.body;

            if (!orderItems || !shippingAddress) {
                res.status(400).json({ success: false, message: 'Order items and shipping address are required' });
                return;
            }

            const order = await this.customerOrderService.createOrder(userId, {
                orderItems,
                shippingAddress,
                paymentMethod
            });

            res.status(201).json({
                success: true,
                message: 'Order placed successfully',
                data: order
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

            const isValid = this.razorpayService.verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

            if(!isValid) {
                res.status(400).json({ success: false, message: 'Invalid payment signature' });
                return;
            }

            const updatedOrder = await this.customerOrderService.markOrderAsPaid(orderId, razorpayPaymentId);

            res.status(200).json({
                success: true,
                message: 'Payment verified and order confirmed successfully',
                data: updatedOrder
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    getMyOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const orders = await this.customerOrderService.getCustomerOrders(userId);

            res.status(200).json({ success: true, data: orders });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const orderIdParam = req.params.id;

            const orderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
            if (!orderId) {
                res.status(400).json({ success: false, message: 'Order ID is required' });
                return;
            }

            const order = await this.customerOrderService.getCustomerOrderById(userId, orderId);
            res.status(200).json({ success: true, data: order });
        } catch (error: any) {
            res.status(403).json({ success: false, message: error.message });
        }
    };
}