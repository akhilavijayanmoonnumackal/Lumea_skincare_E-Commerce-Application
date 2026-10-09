import { Model, Schema, model } from "mongoose";
import { ICategory } from "./category.model";

const categorySchema: Schema = new Schema<ICategory>({
    documentStatus: { type: Boolean, required: true, default: true },
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

categorySchema.pre<ICategory>('save', function() {
    this.updatedAt = new Date();
});

const CATEGORY: Model<ICategory> = model<ICategory>('lumea_categories', categorySchema);
export default CATEGORY;