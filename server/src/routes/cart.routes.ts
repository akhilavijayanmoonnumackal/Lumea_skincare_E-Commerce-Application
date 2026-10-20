import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new CartController();

router.get('/', verifyAuth, controller.getCart);
router.post('/', verifyAuth, controller.addToCart);
router.put('/:productId', verifyAuth, controller.updateQuantity);
router.delete('/:productId', verifyAuth, controller.removeFromCart);

export default router;