import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from 'multer';
import { config } from "../config";

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (_req, file) => {
        const originalName = file.originalname?.split('.')[0] || 'file';
        const cleanedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');

        return {
            folder: 'lumea-products',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
            public_id: `${Date.now()}-${cleanedName}`,
        };
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});