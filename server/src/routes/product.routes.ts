import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyAdminAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const controller = new ProductController();

router.get('/', controller.getAll);
router.post('/', verifyAdminAuth, upload.single('imageUrl'), controller.create);
router.patch('/:id/stock', verifyAdminAuth, controller.updateStock);
router.patch('/:id', verifyAdminAuth, controller.updateProduct);
router.delete('/:id', verifyAdminAuth, controller.delete);

export default router;