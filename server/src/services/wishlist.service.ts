import { WishlistRepository } from "../repositories/wishlist.repository";
import { ProductRepository } from "../repositories/product.repository";
import WISHLIST from "../models/wishlist/wishlist.js"; // 🌟 Add .js extension here
import { IWishlist } from "../models/wishlist/wishlist-model.js"; // 🌟 Add .js extension here

export class WishlistService {
    private wishlistRepository = new WishlistRepository();
    private productRepository = new ProductRepository();

    async getWishlist(userId: string): Promise<IWishlist> {
        let wishlist = await this.wishlistRepository.findByUserId(userId);
        if (!wishlist) {
            wishlist = new WISHLIST({ user: userId, products: [] });
            await wishlist.save();
        }
        return wishlist;
    }

    async addToWishlist(userId: string, productId: string): Promise<IWishlist> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        let wishlist = await this.wishlistRepository.findByUserId(userId);
        if (!wishlist) {
            wishlist = new WISHLIST({ user: userId, products: [] });
        }

        const products = wishlist.products || [];
        const exists = products.some(p => p.toString() === productId);
        
        if (!exists) {
            products.push(productId as any);
        }

        wishlist.products = products;
        return this.wishlistRepository.save(wishlist);
    }

    async removeFromWishlist(userId: string, productId: string): Promise<IWishlist> {
        const wishlist = await this.wishlistRepository.findByUserId(userId);
        if (!wishlist) {
            throw new Error("Wishlist not found");
        }

        wishlist.products = (wishlist.products || []).filter(p => p.toString() !== productId);
        return this.wishlistRepository.save(wishlist);
    }
}