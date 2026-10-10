import { OrderRepository } from "../repositories/order.repository";
import { IOrder, IOrderItem } from "../models/order/order-model";
import { ProductRepository } from "../repositories/product.repository";

export class OrderService {
    private orderRepository = new OrderRepository();
    private productRepository = new ProductRepository();

    async getAllOrders(): Promise<IOrder[]> {
        return this.orderRepository.findAll();
    }

    async getOrderById(id: string): Promise<IOrder | null> {
        return this.orderRepository.findById(id);
    }

    async updateOrderStatus(id: string, updateData: { orderStatus?: string; paymentStatus?: string }): Promise<IOrder | null> {
        const existingOrder = await this.orderRepository.findById(id);

        if(!existingOrder) {
            throw new Error("Order not found");
        }

        if(updateData.orderStatus === 'Cancelled' && existingOrder.orderStatus !== 'Cancelled') {
            for (const item of existingOrder.orderItems) {
                const productId = typeof item.product === 'object' ? (item.product as any)._id : item.product;
                await this.productRepository.restoreStock(productId.toString(), item.quantity);
            }
        }
        return this.orderRepository.updateStatus(id, updateData);
    }

    async createOrder(data: Partial<IOrder>): Promise<IOrder> {
        const orderItems: IOrderItem[] = data.orderItems || [];

        if(orderItems.length === 0) {
            throw new Error("Order must contain at least one item.");
        }

        for (const item of orderItems) {
            const updatedProduct = await this.productRepository.deductStock(
                item.product.toString(),
                item.quantity
            );

            if(!updatedProduct) {
                throw new Error(`Insufficient stock or product not found for ID: ${item.product}`);
            }
        }

        return this.orderRepository.create(data);
    }
}