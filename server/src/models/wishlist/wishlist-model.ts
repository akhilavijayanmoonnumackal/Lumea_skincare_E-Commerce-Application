import { Document, Types } from "mongoose";

export interface IWishlist extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    products: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}