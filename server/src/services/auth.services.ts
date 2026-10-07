import bcrypt from 'bcryptjs';
import { AdminRepository } from '../repositories/admin.repository';
import { generateToken } from '../helpers/jwt.helper';

export class AuthService {
    private adminRespository = new AdminRepository();

    async registerAdmin(data: { adminUserName: string; email: string; password: string; adminUserType?: string }) {
        const existingAdmin = await this.adminRespository.findByEmail(data.email);
        if(existingAdmin) {
            throw { statusCode: 400, message: 'Admin with this email already exists' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newAdmin = await this.adminRespository.create({
            adminUserName: data.adminUserName,
            email: data.email,
            password: hashedPassword,
            adminUserType: data.adminUserType || 'admin',
            documentStatus: true,
        });

        return {
            id: newAdmin._id,
            name: newAdmin.adminUserName,
            email: newAdmin.email,
            type: newAdmin.adminUserType,
        };
    }

    async login(email: string, password: string) {
        const admin = await this.adminRespository.findByEmail(email);
        if(!admin) {
            throw { statusCode: 401, message: 'Invalid email or password' };
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            throw { statusCode: 401, message: 'Invalid email or password' };
        }

        const token = generateToken(admin._id, admin.email);

        return {
            token,
            admin: {
                id: admin._id,
                name: admin.adminUserName,
                email: admin.email,
                type: admin.adminUserType,
            },
        };
    }
}