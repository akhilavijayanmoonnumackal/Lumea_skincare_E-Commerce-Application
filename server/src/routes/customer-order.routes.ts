import { Router } from "express";
import { CustomerOrderController } from "../controllers/customer-order.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new CustomerOrderController();

router.post('/orders', verifyAuth, controller.createOrder);
router.get('/orders/my-orders', verifyAuth, controller.getMyOrders);
router.get('/orders/:id', verifyAuth, controller.getOrderById);

export default router;