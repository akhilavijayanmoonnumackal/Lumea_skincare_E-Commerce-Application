import { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist-model.js";

const WishlistSchema = new Schema<IWishlist>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'lumea_products' }]
}, { timestamps: true });

export default model<IWishlist>('Wishlist', WishlistSchema);