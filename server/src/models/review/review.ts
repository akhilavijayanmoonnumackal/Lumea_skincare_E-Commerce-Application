import { Model, Schema, model } from "mongoose";
import { IReview } from "./review-model";

const reviewSchema: Schema = new Schema<IReview>({
    product: { type: Schema.Types.ObjectId, ref: 'lumea_products', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'lumea_users', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

reviewSchema.pre<IReview>('save', function() {
    this.updatedAt = new Date();
});

const REVIEW: Model<IReview> = model<IReview>('lumea_reviews', reviewSchema);
export default REVIEW;