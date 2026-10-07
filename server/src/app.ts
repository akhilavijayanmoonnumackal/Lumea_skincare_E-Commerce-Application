import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { timeStamp } from 'node:console';

export function createApp(): Application {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ status: 'OK', timeStamp: new Date(), message: 'Luméa API is running' });
    });

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error',
        });
    });

    return app;
}