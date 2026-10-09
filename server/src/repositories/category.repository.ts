import CATEGORY from "../models/category/category"; 
import { ICategory } from "../models/category/category.model";

export class CategoryRepository {
    async create(data: Partial<ICategory>): Promise<ICategory> {
        const category = new CATEGORY(data);
        return category.save();
    }

    async findAll(): Promise<ICategory[]> {
        return CATEGORY.find().sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<ICategory | null> {
        return CATEGORY.findById(id);
    }

    async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        return CATEGORY.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<ICategory | null> {
        return CATEGORY.findByIdAndDelete(id);
    }
}