import { Router } from "express";
import { AdminUserController } from "../controllers/admin-user.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AdminUserController();

router.get('/users', verifyAdminAuth, controller.getAllCustomers);
router.get('/users/:id', verifyAdminAuth, controller.getCustomerDetails);
router.put('/users/:id/status', verifyAdminAuth, controller.updateCustomerStatus);

export default router;