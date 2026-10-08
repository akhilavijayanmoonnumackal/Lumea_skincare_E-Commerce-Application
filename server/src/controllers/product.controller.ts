import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    private productService = new ProductService();

    getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let imageUrl = req.body.imageUrl;
            if(req.file) {
                imageUrl = req.file.path;
            }

            const productData = { ...req.body, imageUrl };
            const product = await this.productService.createProduct(productData);

            res.status(201).json({ success: true, message: 'Product created successfully', data: product });
        } catch (error) {
            next(error);
        }
    };

    updateStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { stockCount } = req.body;
            const product = await this.productService.updateStock(req.params.id as string, stockCount);
            res.status(200).json({ success: true, message: 'Stock updated', data: product });
        } catch (error) {
            next(error);
        }
    };

    updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const updateProduct = await this.productService.upadateProduct(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: updateProduct,
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.productService.deleteProduct(req.params.id as string);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            next(error);
        }
    };
}