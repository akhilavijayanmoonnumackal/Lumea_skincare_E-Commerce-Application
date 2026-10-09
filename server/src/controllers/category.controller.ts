import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    private categoryService = new CategoryService();

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryData = { ...req.body };
            const category = await this.categoryService.createCategory(categoryData);

            res.status(201).json({ success: true, message: 'Category created successfully', data: category });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({ success: true, count: categories.length, data: categories });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateData = req.file ? { ...req.body } : req.body;
            const categoryId = req.params.id as string;
            const category = await this.categoryService.updateCategory(categoryId, updateData);

            if (!category) {
                res.status(404).json({ success: false, message: 'Category not found' });
                return;
            }

            res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categoryId = req.params.id as string;
            const category = await this.categoryService.deleteCategory(categoryId);

            if (!category) {
                res.status(404).json({ success: false, message: 'Category not found' });
                return;
            }
            res.status(200).json({ success: true, message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}