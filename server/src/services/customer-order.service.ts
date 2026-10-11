import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { IOrder } from "../models/order/order-model";

export class CustomerOrderService {
    private orderRepository = new OrderRepository();
    private productRepository = new ProductRepository();

    async createOrder(userId: string, orderData: {
        orderItems: Array<{ product: string; quantity: number; price: number }>;
        shippingAddress: {
            address: string;
            city: string;
            postalCode: string;
            country: string;
            phone: string;
        };
        paymentMethod: string;
    }): Promise<IOrder> {
        if (!orderData.orderItems || orderData.orderItems.length === 0) {
            throw new Error("No order items provided");
        }

        let calculatedTotalPrice = 0;
        const processedItems = [];

        for (const item of orderData.orderItems) {
            const product = await this.productRepository.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            if (product.stockCount < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }

            const stockDeducted = await this.productRepository.deductStock(item.product, item.quantity);
            if (!stockDeducted) {
                throw new Error(`Failed to process stock for product: ${product.name}. Please try again.`);
            }

            calculatedTotalPrice += product.price * item.quantity;
            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const newOrder = await this.orderRepository.create({
            user: userId as any,
            orderItems: processedItems as any,
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod || 'COD',
            totalPrice: calculatedTotalPrice,
            orderStatus: 'Pending',
            paymentStatus: 'Pending'
        });

        return newOrder;
    }

    async getCustomerOrders(userId: string): Promise<IOrder[]> {
        return this.orderRepository.findByUser(userId);
    }

    async getCustomerOrderById(userId: string, orderId: string): Promise<IOrder | null> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }

        if (order.user && order.user._id.toString() !== userId.toString()) {
            throw new Error("Unauthorized access to order");
        }
        return order;
    }
}