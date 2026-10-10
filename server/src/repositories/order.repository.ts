// src/repositories/order.repository.ts
import ORDER from "../models/order/order";
import { IOrder } from "../models/order/order-model";

export class OrderRepository {
    async findAll(): Promise<IOrder[]> {
        return ORDER.find()
            .populate(['user', 'orderItems.product'])
            .sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IOrder | null> {
        return ORDER.findById(id).populate(['user', 'orderItems.product']);
    }

    async updateStatus(id: string, updateData: { orderStatus?: string; paymentStatus?: string }): Promise<IOrder | null> {
        return ORDER.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        ).populate(['user', 'orderItems.product']);
    }

    async create(data: Partial<IOrder>): Promise<IOrder> {
        const order = new ORDER(data);
        const savedOrder = await order.save();
        return savedOrder.populate(['user', 'orderItems.product']);
    }
}