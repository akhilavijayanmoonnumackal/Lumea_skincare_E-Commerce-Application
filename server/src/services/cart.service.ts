import { CartRepository } from "../repositories/cart.repository";
import { ProductRepository } from "../repositories/product.repository";
import CART from "../models/cart/cart.js";
import { ICart } from "../models/cart/cart-model.js";

export class CartService {
    private cartRepository = new CartRepository();
    private productRepository = new ProductRepository();

    async getCart(userId: string): Promise<ICart> {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = new CART({ user: userId, items: [] });
            await cart.save();
        }
        return cart;
    }

    async addToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        if (product.stockCount < quantity) {
            throw new Error("Insufficient stock available");
        }

        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = new CART({ user: userId, items: [] });
        }

        const items = cart.items || [];
        const existingItem = items.find(item => item.product.toString() === productId);

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (product.stockCount < newQuantity) {
                throw new Error("Cannot add more than available stock");
            }
            existingItem.quantity = newQuantity;
        } else {
            items.push({ product: productId as any, quantity });
        }

        cart.items = items;
        return this.cartRepository.save(cart);
    }

    async removeFromCart(userId: string, productId: string): Promise<ICart> {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.items = (cart.items || []).filter(item => item.product.toString() !== productId);
        return this.cartRepository.save(cart);
    }
}