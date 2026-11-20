import axiosClient from "./axiosClient";
import type { Order } from "./orderApi";

export interface CustomerAddress {
    _id?: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

export interface Customer {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    isActive: boolean;
    addresses: CustomerAddress[];
    createdAt: string;
    updatedAt?: string;
}

export interface CustomersListResponse {
    success: boolean;
    count: number;
    data: Customer[];
}

export interface CustomerDetailsPayload {
    customer: Customer;
    orderCount: number;
    orders: Order[];
}

export interface CustomerDetailsResponse {
    success: boolean;
    message?: string;
    data: CustomerDetailsPayload;
}

export interface UpdateCustomerStatusResponse {
    success: boolean;
    message: string;
    data: Customer;
}

// Adjust '/admin/users' to '/users' if admin-user.routes.ts is mounted directly at '/api'
const BASE_PATH = '/admin/users';

export const getAllCustomers = async (): Promise<CustomersListResponse> => {
    const response = await axiosClient.get(BASE_PATH);
    return response.data;
};

export const getCustomerDetails = async (userId: string): Promise<CustomerDetailsResponse> => {
    const response = await axiosClient.get(`${BASE_PATH}/${userId}`);
    return response.data;
};

export const updateCustomerStatus = async (
    userId: string,
    isActive: boolean
): Promise<UpdateCustomerStatusResponse> => {
    const response = await axiosClient.put(`${BASE_PATH}/${userId}/status`, { isActive });
    return response.data;
};