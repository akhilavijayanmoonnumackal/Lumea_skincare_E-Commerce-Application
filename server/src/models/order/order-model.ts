import { Document, Types } from "mongoose";

export interface IOrderItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    paymentMethod: string;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalPrice: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}