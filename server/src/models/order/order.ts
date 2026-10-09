import { Model, Schema, model } from "mongoose";
import { IOrder } from "./order-model";

const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'lumea_products', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
});

const orderSchema: Schema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'lumea_users', required: true, index: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true, default: 'COD' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    totalPrice: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre<IOrder>('save', function() {
    this.updatedAt = new Date();
});

const ORDER: Model<IOrder> = model<IOrder>('lumea_orders', orderSchema);
export default ORDER;