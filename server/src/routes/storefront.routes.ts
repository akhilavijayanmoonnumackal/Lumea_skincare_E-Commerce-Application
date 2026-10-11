import { Router } from "express";
import { StorefrontController } from "../controllers/storefront.controller";

const router = Router();
const controller = new StorefrontController();

router.get('/products', controller.getProducts);
router.get('/products/:slug', controller.getProductBySlug);
router.get('/categories', controller.getCategories);

export default router;