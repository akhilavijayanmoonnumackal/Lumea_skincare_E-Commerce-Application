import jwt from "jsonwebtoken";
import { config } from "../config";
import { Types } from "mongoose";

export function generateToken(adminId: Types.ObjectId, email: string): string {
    const secret = config.jwtSecret;
    if(!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    return jwt.sign({ adminId, email }, secret, { expiresIn: '7d' });
}