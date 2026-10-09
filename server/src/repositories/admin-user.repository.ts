import USER from "../models/user/user";
import ORDER from "../models/order/order";
import { IUser } from "../models/user/user-model";
import { IOrder } from "../models/order/order-model";

export class AdminUserRepository {
    async findAllCustomers(): Promise<IUser[]> {
        return USER.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
    }

    async findCustomerById(id: string): Promise<{ customer: IUser | null; orders: IOrder[] }> {
        const customer = await USER.findOne({ _id: id, role: 'customer' }).select('-password');
        const orders = customer ? await ORDER.find({ user: customer._id }).sort({ createdAt: -1 }) : [];
        return { customer, orders };
    }

    async updateUserStatus(id: string, isActive: boolean): Promise<IUser | null> {
        return USER.findOneAndUpdate(
            { _id: id, role: 'customer' },
            { isActive },
            { new: true, runValidators: true }
        ).select('-password');
    }
}