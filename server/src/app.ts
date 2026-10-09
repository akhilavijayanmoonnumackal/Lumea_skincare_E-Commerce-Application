import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import orderRoutes from './routes/order.routes';
import adminUserRoutes from './routes/admin-user.routes';
import { globalErrorHandler } from './middlewares/error.middleware';

export function createApp(): Application {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/admin', adminUserRoutes);

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ status: 'OK', timeStamp: new Date(), message: 'Luméa API is running' });
    });

    app.use(globalErrorHandler);

    return app;
}