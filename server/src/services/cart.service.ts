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
            cart = await this.cartRepository.findByUserId(userId);
        }
        return cart!;
    }

    async addToCart(userId: string, productId: string, quantity: number, variant: string = 'Standard'): Promise<ICart> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = new CART({ user: userId, items: [] });
        }

        const items = cart.items || [];

        const existingItem = items.find(item => item.product.toString() === productId);

        const targetQuantity = existingItem ? existingItem.quantity + quantity : quantity;

        if (product.stockCount < targetQuantity) {
            throw new Error("Insufficient stock available");
        }

        if (existingItem) {
            existingItem.quantity = targetQuantity;
            if (variant) existingItem.variant = variant;
        } else {
            items.push({ product: productId as any, quantity, variant });
        }

        cart.items = items;
        return this.cartRepository.save(cart);
    }

    async updateQuantity(userId: string, productId: string, quantity: number): Promise<ICart> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        if (quantity <= 0) {
            return this.removeFromCart(userId, productId);
        }

        if (product.stockCount < quantity) {
            throw new Error("Insufficient stock available");
        }

        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const items = cart.items || [];
        const targetProductId = String(productId);

        const otherItems = items.filter(item => {
            const prod = item.product as any;
            const itemProdId = prod && typeof prod === 'object' && prod._id 
                ? String(prod._id) 
                : String(prod);
            return itemProdId !== targetProductId;
        });

        const matchingItems = items.filter(item => {
            const prod = item.product as any;
            const itemProdId = prod && typeof prod === 'object' && prod._id 
                ? String(prod._id) 
                : String(prod);
            return itemProdId === targetProductId;
        });

        if (matchingItems.length > 0) {
            const primaryItem = matchingItems[0];
            if (primaryItem) {
                primaryItem.quantity = quantity;
                otherItems.push(primaryItem);
            }
        } else {
            otherItems.push({ product: productId as any, quantity });
        }

        cart.items = otherItems;
        return this.cartRepository.save(cart);
    }

    async removeFromCart(userId: string, productId: string): Promise<ICart> {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.items = (cart.items || []).filter(item => item.product.toString() !== productId);
        return this.cartRepository.save(cart);
    }
}