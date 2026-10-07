import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { globalErrorHandler } from './middlewares/error.middleware';

export function createApp(): Application {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());

    //API Routes
    app.use('/api/auth', authRoutes);

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ status: 'OK', timeStamp: new Date(), message: 'Luméa API is running' });
    });

    app.use(globalErrorHandler);

    return app;
}