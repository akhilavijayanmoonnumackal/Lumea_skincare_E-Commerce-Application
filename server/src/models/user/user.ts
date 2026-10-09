import { Model, Schema, model } from "mongoose";
import { IUser } from "./user-model";

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre<IUser>('save', function() {
    this.updatedAt = new Date();
});

const USER: Model<IUser> = model<IUser>('lumea_users', userSchema);
export default USER;