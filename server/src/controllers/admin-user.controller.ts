import { Request, Response, NextFunction } from "express";
import { AdminUserService } from "../services/admin-user.service";

export class AdminUserController {
    private adminUserService = new AdminUserService();

    getAllCustomers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const customers = await this.adminUserService.getAllCustomers();
            res.status(200).json({ 
                success: true, 
                count: customers.length, 
                data: customers 
            });
        } catch (error) {
            next(error);
        }
    };

    getCustomerDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string;
            const { customer, orders } = await this.adminUserService.getCustomerDetails(userId);

            if (!customer) {
                res.status(404).json({ success: false, message: 'Customer not found' });
                return;
            }

            res.status(200).json({ 
                success: true, 
                data: { 
                    customer, 
                    orderCount: orders.length, 
                    orders 
                } 
            });
        } catch (error) {
            next(error);
        }
    };

    updateCustomerStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string;
            const { isActive } = req.body; // Expects boolean (true/false)

            if (typeof isActive !== 'boolean') {
                res.status(400).json({ success: false, message: 'isActive status must be a boolean value' });
                return;
            }

            const updatedCustomer = await this.adminUserService.toggleCustomerStatus(userId, isActive);

            if (!updatedCustomer) {
                res.status(404).json({ success: false, message: 'Customer not found' });
                return;
            }

            res.status(200).json({ 
                success: true, 
                message: `Customer account has been ${isActive ? 'activated' : 'blocked'} successfully`, 
                data: updatedCustomer 
            });
        } catch (error) {
            next(error);
        }
    };
}