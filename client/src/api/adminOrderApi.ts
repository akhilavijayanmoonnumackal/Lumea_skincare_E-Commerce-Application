import axiosClient from "./axiosClient";
import type { ShippingAddress } from "./orderApi";

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';

export interface PopulatedUserRef {
    _id: string;
    name: string;
    email: string;
}

export interface PopulatedProductRef {
    _id: string;
    name: string;
    price?: number;
    imageUrl?: string;
}

export interface AdminOrderItem {
    _id?: string;
    product: string | PopulatedProductRef;
    quantity: number;
    price: number;
}

export interface AdminOrder {
    _id: string;
    user: string | PopulatedUserRef;
    orderItems: AdminOrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminOrdersListResponse {
    success: boolean;
    count?: number;
    data: AdminOrder[];
}

export interface AdminOrderResponse {
    success: boolean;
    message?: string;
    data: AdminOrder;
}

export interface UpdateOrderStatusPayload {
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
}

export const getAllAdminOrders = async (): Promise<AdminOrdersListResponse> => {
    const response = await axiosClient.get('/orders');
    return response.data;
};

export const getAdminOrderById = async (orderId: string): Promise<AdminOrderResponse> => {
    const response = await axiosClient.get(`/orders/${orderId}`);
    return response.data;
};

export const updateAdminOrderStatus = async (
    orderId: string,
    payload: UpdateOrderStatusPayload
): Promise<AdminOrderResponse> => {
    const response = await axiosClient.put(`/orders/${orderId}/status`, payload);
    return response.data;
};