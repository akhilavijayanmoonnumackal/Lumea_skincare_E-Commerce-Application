import { AdminUserRepository } from "../repositories/admin-user.repository";
import { IUser } from "../models/user/user-model";
import { IOrder } from "../models/order/order-model";

export class AdminUserService {
    private adminUserRepository = new AdminUserRepository();

    async getAllCustomers(): Promise<IUser[]> {
        return this.adminUserRepository.findAllCustomers();
    }

    async getCustomerDetails(id: string): Promise<{ customer: IUser | null; orders: IOrder[] }> {
        return this.adminUserRepository.findCustomerById(id);
    }

    async toggleCustomerStatus(id: string, isActive: boolean): Promise<IUser | null> {
        return this.adminUserRepository.updateUserStatus(id, isActive);
    }
}