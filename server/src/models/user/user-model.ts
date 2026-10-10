import { Document, Types } from "mongoose";

export interface IAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}
export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    role: 'customer' | 'admin';
    isActive: boolean;
    addresses: IAddress[];
    createdAt: Date | null;
    updatedAt: Date | null;
}