import { CategoryRepository } from "../repositories/category.repository";
import { ICategory } from "../models/category/category.model"; 

export class CategoryPublicService {
    private categoryRepository = new CategoryRepository();

    async getAllCategories(): Promise<ICategory[]> {
        return this.categoryRepository.findAllPublic();
    }
}