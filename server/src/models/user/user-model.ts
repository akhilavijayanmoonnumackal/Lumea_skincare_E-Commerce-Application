import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    role: 'customer' | 'admin';
    isActive: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
}