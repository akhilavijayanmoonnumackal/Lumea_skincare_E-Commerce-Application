import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cart.service";

export class CartController {
    private cartService = new CartService();

    getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const cart = await this.cartService.getCart(userId);
            res.status(200).json({ success: true, data: cart });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { productId, quantity, variant } = req.body;

            if (!productId || !quantity) {
                res.status(400).json({ success: false, message: "Product ID and quantity are required" });
                return;
            }

            const cart = await this.cartService.addToCart(userId, productId, Number(quantity), variant);
            res.status(200).json({ success: true, message: "Item added to cart", data: cart });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    updateQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const productIdParam = req.params.productId;
            const productId = Array.isArray(productIdParam) ? productIdParam[0] : productIdParam;
            const { quantity } = req.body;

            if (!productId || quantity === undefined) {
                res.status(400).json({ success: false, message: "Product ID and quantity are required" });
                return;
            }

            const cart = await this.cartService.updateQuantity(userId, productId, Number(quantity));
            res.status(200).json({ success: true, message: "Cart updated", data: cart });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    removeFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const productIdParam = req.params.productId;
            const productId = Array.isArray(productIdParam) ? productIdParam[0] : productIdParam;

            if (!productId) {
                res.status(400).json({ success: false, message: "Product ID is required" });
                return;
            }

            const cart = await this.cartService.removeFromCart(userId, productId);
            res.status(200).json({ success: true, message: "Item removed from cart", data: cart });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}