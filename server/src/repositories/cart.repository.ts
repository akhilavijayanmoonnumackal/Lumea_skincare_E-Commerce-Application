import CART from "../models/cart/cart";
import { ICart } from "../models/cart/cart-model";

export class CartRepository {
    async findByUserId(userId: string): Promise<ICart | null> {
        return CART.findOne({ user: userId }).populate('items.product');
    }

    async save(cart: ICart): Promise<ICart> {
        const saved = await cart.save();
        return saved.populate('items.product');
    }

    async clearCart(userId: string): Promise<void> {
        await CART.findOneAndDelete({ user: userId });
    }
}