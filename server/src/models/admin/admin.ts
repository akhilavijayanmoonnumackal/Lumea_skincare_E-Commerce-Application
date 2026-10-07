import { Model, Schema, model } from 'mongoose';
import { IAdmin } from './admin-model';

const adminSchema: Schema = new Schema<IAdmin>({
    documentStatus: { type: Boolean, required: true, default: true },
    adminUserName: { type: String, required: true, default: '' },
    adminUserType: { type: String, required: true, default: 'admin' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

adminSchema.pre<IAdmin>('save', function () {
    this.updatedAt = new Date();
});

const ADMIN: Model<IAdmin> = model<IAdmin>('lumea_admins', adminSchema);
export default ADMIN;