import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new OrderController();

router.get('/', verifyAdminAuth, controller.getAllOrders);
router.get('/:id', verifyAdminAuth, controller.getOrderById);
router.put('/:id/status', verifyAdminAuth, controller.updateOrderStatus);

export default router;