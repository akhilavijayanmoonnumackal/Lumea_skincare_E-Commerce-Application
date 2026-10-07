import { createApp } from "./app";
import { connectDB } from "./database/db";
import { config } from "./config";

async function startServer() {
    try {
        await connectDB();
        const app = createApp();

        app.listen(config.port, () => {
            console.log(`Luméa Backend running on port ${config.port} in ${config.nodeEnv} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();