import { Document, Types } from "mongoose";

export interface IAdmin extends Document {
    _id: Types.ObjectId;
    documentStatus: boolean;
    adminUserName: string;
    adminUserType: string;
    email: string;
    password: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}