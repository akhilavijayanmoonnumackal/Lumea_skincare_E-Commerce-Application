import { Schema, model } from "mongoose";
import { ICart, ICartItem } from "./cart-model";

const CartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'lumea_products', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
});

const CartSchema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [CartItemSchema]
}, { timestamps: true });

export default model<ICart>('Cart', CartSchema);