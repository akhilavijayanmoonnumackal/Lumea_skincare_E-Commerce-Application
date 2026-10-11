import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new WishlistController();

router.get('/', verifyAuth, controller.getWishlist);
router.post('/', verifyAuth, controller.addToWishlist);
router.delete('/:productId', verifyAuth, controller.removeFromWishlist);

export default router;