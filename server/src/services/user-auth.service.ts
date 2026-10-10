import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { IUser, IAddress } from "../models/user/user-model";

export class UserAuthService {
    private userRepository = new UserRepository();

    async register(data: { name: string; email: string; password: string }): Promise<{ user: Partial<IUser>; token: string }> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: 'customer'
        });

        const token = this.generateToken(newUser);
        const { password, ...userWithoutPassword } = newUser.toObject();

        return { user: userWithoutPassword, token };
    }

    async login(data: { email: string; password: string }): Promise<{ user: Partial<IUser>; token: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }

        if (!user.isActive) {
            throw new Error("Your account has been deactivated. Please contact support.");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = this.generateToken(user);
        const { password, ...userWithoutPassword } = user.toObject();

        return { user: userWithoutPassword, token };
    }

    async getProfile(userId: string): Promise<IUser | null> {
        return this.userRepository.findById(userId);
    }

    async updateProfile(userId: string, data: { name?: string }): Promise<IUser | null> {
        return this.userRepository.updateProfile(userId, data);
    }

    async addAddress(userId: string, address: IAddress): Promise<IUser | null> {
        return this.userRepository.addAddress(userId, address);
    }

    private generateToken(user: IUser): string {
        const secret = process.env.JWT_SECRET || "lumea_secret_key";
        return jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            secret,
            { expiresIn: '7d' }
        );
    }
}