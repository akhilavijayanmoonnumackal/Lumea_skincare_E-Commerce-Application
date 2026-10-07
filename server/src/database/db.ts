import mongoose from "mongoose";
import { config } from "../config";

export async function connectDB(): Promise<void> {
    try {
        const mongoUri = config.mongoUri;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    } 
}