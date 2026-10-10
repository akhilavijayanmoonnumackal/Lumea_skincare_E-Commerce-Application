import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// export interface AuthenticatedRequest extends Request {
//     admin?: any;
// }

// export function verifyAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
//     try {
//         const authHeader = req.headers.authorization;
//         if(!authHeader || !authHeader.startsWith('Bearer ')) {
//             res.status(401).json({ success: false, message: 'Access denied. No token provided' });
//             return;
//         }

//         const token = authHeader.split(' ')[1]!;
//         const secret = config.jwtSecret;
//             if(!secret) {
//                 throw new Error('JWT_SECRET is not defined in environment variables.');
//             }
//         const decoded = jwt.verify(token, secret);
//         req.admin = decoded;
//         next();
//     } catch (error) {
//         res.status(403).json({ success: false, message: 'Invalid or expired token' });
//     }
// };

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
            return;
        }

        const token = authHeader.split(' ')[1] as string;
        if (!token) {
            res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
            return;
        }
        
        const secret: string = process.env.JWT_SECRET || "lumea_secret_key";
        const decoded = jwt.verify(token, secret);

        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export const verifyAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
    verifyAuth(req, res, () => {
        const decoded = (req as any).user;

        console.log("Decoded JWT Payload:", decoded);

        const isAdmin = decoded?.role === 'admin' || decoded?.user?.role === 'admin' || Boolean(decoded?.adminId);

        if (isAdmin) {
            next();
        } else {
             res.status(403).json({
                success: false, 
                message: 'Access denied. Admin privileges required.'
             });
        }
    });
};