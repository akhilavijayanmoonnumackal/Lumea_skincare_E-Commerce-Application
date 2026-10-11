import { Request, Response, NextFunction } from "express";
import { WishlistService } from "../services/wishlist.service";

export class WishlistController {
    private wishlistService = new WishlistService();

    getWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const wishlist = await this.wishlistService.getWishlist(userId);
            res.status(200).json({ success: true, data: wishlist });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    addToWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { productId } = req.body;

            if (!productId) {
                res.status(400).json({ success: false, message: "Product ID is required" });
                return;
            }

            const wishlist = await this.wishlistService.addToWishlist(userId, productId);
            res.status(200).json({ success: true, message: "Product added to wishlist", data: wishlist });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    removeFromWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const productIdParam = req.params.productId;
            const productId = Array.isArray(productIdParam) ? productIdParam[0] : productIdParam;

            if (!productId) {
                res.status(400).json({ success: false, message: "Product ID is required" });
                return;
            }

            const wishlist = await this.wishlistService.removeFromWishlist(userId, productId);
            res.status(200).json({ success: true, message: "Product removed from wishlist", data: wishlist });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}