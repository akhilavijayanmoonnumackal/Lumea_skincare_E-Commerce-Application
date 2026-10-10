import { Request, Response, NextFunction } from "express";
import { UserAuthService } from "../services/user-auth.service";

export class UserAuthController {
    private userAuthService = new UserAuthService();

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ success: false, message: 'Name, email, and password are required' });
                return;
            }

            const result = await this.userAuthService.register({ name, email, password });
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ success: false, message: 'Email and password are required' });
                return;
            }

            const result = await this.userAuthService.login({ email, password });
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error: any) {
            res.status(401).json({ success: false, message: error.message });
        }
    };

    getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const profile = await this.userAuthService.getProfile(userId);

            if (!profile) {
                res.status(404).json({ success: false, message: 'User profile not found' });
                return;
            }

            res.status(200).json({ success: true, data: profile });
        } catch (error) {
            next(error);
        }
    };

    updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { name } = req.body;

            const updatedProfile = await this.userAuthService.updateProfile(userId, { name });
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            });
        } catch (error) {
            next(error);
        }
    };

    addAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id;
            const { address, city, postalCode, country, phone, isDefault } = req.body;

            if (!address || !city || !postalCode || !country || !phone) {
                res.status(400).json({ success: false, message: 'All address fields are required' });
                return;
            }

            const updatedProfile = await this.userAuthService.addAddress(userId, {
                address, city, postalCode, country, phone, isDefault
            });

            res.status(200).json({
                success: true,
                message: 'Address added successfully',
                data: updatedProfile
            });
        } catch (error) {
            next(error);
        }
    };
}