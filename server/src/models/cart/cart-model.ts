import { Document, Types } from "mongoose";

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}