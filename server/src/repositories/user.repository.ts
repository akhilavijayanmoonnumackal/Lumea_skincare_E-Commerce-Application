import USER from "../models/user/user";
import { IAddress, IUser } from "../models/user/user-model";

export class UserRepository {
    async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new USER(userData);
        return user.save();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return USER.findOne({ email });
    }

    async findById(id: string): Promise<IUser | null> {
        return USER.findById(id).select('-password');
    }

    async updateProfile(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return USER.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');
    }

    async addAddress(id: string, address: IAddress): Promise<IUser | null> {
        return USER.findByIdAndUpdate(
            id,
            { $push: { addresses: address } },
            { new: true, runValidators: true }
        ).select('-password');
    }
}