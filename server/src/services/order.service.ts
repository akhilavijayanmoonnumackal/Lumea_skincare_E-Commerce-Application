// src/services/order.service.ts
import { OrderRepository } from "../repositories/order.repository";
import { IOrder } from "../models/order/order-model";

export class OrderService {
    private orderRepository = new OrderRepository();

    async getAllOrders(): Promise<IOrder[]> {
        return this.orderRepository.findAll();
    }

    async getOrderById(id: string): Promise<IOrder | null> {
        return this.orderRepository.findById(id);
    }

    async updateOrderStatus(id: string, updateData: { orderStatus?: string; paymentStatus?: string }): Promise<IOrder | null> {
        return this.orderRepository.updateStatus(id, updateData);
    }
}