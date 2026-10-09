import { Document, Types } from "mongoose";

export interface ICategory extends Document {
    _id: Types.ObjectId;
    documentStatus: boolean;
    name: string;
    isActive: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
}