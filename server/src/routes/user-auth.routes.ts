import { Router } from "express";
import { UserAuthController } from "../controllers/user-auth.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserAuthController();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/profile', verifyAuth, controller.getProfile);
router.put('/profile', verifyAuth, controller.updateProfile);
router.post('/address', verifyAuth, controller.addAddress);

export default router;