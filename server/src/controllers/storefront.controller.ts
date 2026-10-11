import { Request, Response, NextFunction } from "express";
import { ProductPublicService } from "../repositories/product-public.service";
import { CategoryPublicService } from "../repositories/category-public.service"; 

export class StorefrontController {
    private productPublicService = new ProductPublicService();
    private categoryPublicService = new CategoryPublicService();

    getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.productPublicService.getProducts(req.query as any);
            res.status(200).json({
                success: true,
                data: result.products,
                pagination: {
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const slugParam = req.params.slug;

            const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
            if (!slug) {
                res.status(400).json({ success: false, message: 'Product slug is required' });
                return;
            }
            
            const product = await this.productPublicService.getProductBySlug(slug);
            res.status(200).json({ success: true, data: product });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message });
        }
    };

    getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categories = await this.categoryPublicService.getAllCategories();
            res.status(200).json({ success: true, data: categories });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
}