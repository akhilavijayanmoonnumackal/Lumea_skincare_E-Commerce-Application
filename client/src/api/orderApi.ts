import axiosClient from "./axiosClient";

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}

export interface OrderItem {
    _id?: string;
    product: {
        _id: string;
        product: {
            _id: string;
            name: string;
            price: number;
            imageUrl?: string;
        };
        quantity: number;
        price: number;
    }
}

export interface Order {
    _id: string;
    user: string;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderPayload {
    orderItems: Array<{
        product: string;
        quantity: number;
        price: number;
    }>;
    shippingAddress: ShippingAddress;
    paymentMethod?: string;
}

export interface CreateOrderResponse {
    success: boolean;
    message?: string;
    data: {
        order: Order;
        razorpayOrderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
    };
}

export interface OrderResponse {
    success: boolean;
    message?: string;
    data: Order;
}

export interface OrdersListResponse {
    success: boolean;
    message?: string;
    data: Order[];
}

export interface verifyPaymentPayload {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await axiosClient.post('/customerOrders/orders', payload);
    return response.data;
};

export const verifyPayment = async (payload: verifyPaymentPayload) => {
    const response = await axiosClient.post('/customerOrders/orders/verify-payment', payload);
    return response.data;
};

export const getMyOrders = async (): Promise<OrdersListResponse> => {
    const response = await axiosClient.get('/customerOrders/orders/my-orders');
    return response.data;
};

export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
    const response = await axiosClient.get(`/customerOrders/orders/${orderId}`);
    return response.data;
};