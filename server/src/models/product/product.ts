import { Model, Schema, model } from "mongoose";
import { IProduct } from "./product-model";

const productSchema: Schema = new Schema<IProduct>({
    documentStatus: { type: Boolean, required: true, default: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    stockCount: { type: Number, required: true, default:0, min: 0 },
    imageUrl: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

productSchema.pre<IProduct>('save', function() {
    this.updatedAt = new Date();
});

const PRODUCT: Model<IProduct> = model<IProduct>('lumea_products', productSchema);
export default PRODUCT;