import ADMIN from "../models/admin/admin";
import { IAdmin } from "../models/admin/admin-model";

export class AdminRepository {
    async findByEmail(email: string): Promise<IAdmin | null> {
        return ADMIN.findOne({ email, documentStatus: true });
    }

    async findById(id: string): Promise<IAdmin | null> {
        return ADMIN.findById(id);
    }

    async create(adminData: Partial<IAdmin>): Promise<IAdmin> {
        const admin = new ADMIN(adminData);
        return admin.save();
    }
}