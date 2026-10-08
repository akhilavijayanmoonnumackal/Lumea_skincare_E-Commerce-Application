import { Document, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    documentStatus: boolean;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    stockCount: number;
    imageUrl: string;
    isFeatured: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
}