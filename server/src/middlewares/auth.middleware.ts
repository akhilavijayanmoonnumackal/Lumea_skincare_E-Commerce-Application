import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config";

export interface AuthenticatedRequest extends Request {
    admin?: any;
}

export function verifyAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Access denied. No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1]!;
        const secret = config.jwtSecret;
            if(!secret) {
                throw new Error('JWT_SECRET is not defined in environment variables.');
            }
        const decoded = jwt.verify(token, secret);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
}