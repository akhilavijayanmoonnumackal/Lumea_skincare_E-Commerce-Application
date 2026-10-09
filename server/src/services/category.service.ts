import { CategoryRepository } from "../repositories/category.repository"; 
import { ICategory } from "../models/category/category.model"; 

export class CategoryService {
    private categoryRepository = new CategoryRepository();

    async createCategory(data: Partial<ICategory>): Promise<ICategory> {
        return this.categoryRepository.create(data);
    }

    async getAllCategories(): Promise<ICategory[]> {
        return this.categoryRepository.findAll();
    }

    async getCategoryById(id: string): Promise<ICategory | null> {
        return this.categoryRepository.findById(id);
    }

    async updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        return this.categoryRepository.update(id, data);
    }

    async deleteCategory(id: string): Promise<ICategory | null> {
        return this.categoryRepository.delete(id);
    }
}