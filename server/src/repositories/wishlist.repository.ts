import WISHLIST from "../models/wishlist/wishlist";
import { IWishlist } from "../models/wishlist/wishlist-model";

export class WishlistRepository {
    async findByUserId(userId: string): Promise<IWishlist | null> {
        return WISHLIST.findOne({ user: userId }).populate('products');
    }

    async save(wishlist: IWishlist): Promise<IWishlist> {
        const saved = await wishlist.save();
        return saved.populate('products');
    }
}