import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new CategoryController();

router.get('/', controller.getAll);
router.post('/', verifyAdminAuth, controller.create);
router.patch('/:id', verifyAdminAuth, controller.update);
router.delete('/:id', verifyAdminAuth, controller.delete);

export default router;