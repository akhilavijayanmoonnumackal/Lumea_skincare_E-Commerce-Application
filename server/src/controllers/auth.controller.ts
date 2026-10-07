import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.services";

export class AuthController {
    private authService = new AuthService();

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.authService.registerAdmin(req.body);
            res.status(201).json({ success: true, message: 'Admin created successfully', data: result });
        } catch (error: any) {
            console.error("REGISTER ERROR STACK:", error);
            
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Internal Server Error'
            });
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.status(200).json({ success: true, message: 'Login successful', data: result });
        } catch (error) {
            next(error);
        }
    };
}