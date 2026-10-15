import axiosClient from "./axiosClient";
import type { CategoryObject } from "./productApi";

export interface categoryObject {
    _id?: string;
    name?: string;
    slug?: string;
}

export interface CartItemBackend {
    _id: string;
    product: {
        _id: string;
        name: string;
        price: number;
        imageUrl: string;
        category?: string | CategoryObject;
    };
    quantity: number;
    variant: string;
}

export interface CartResponse {
    success: boolean;
    data: {
        items: CartItemBackend[];
        totalAmount?: number;
    };
}

export const getCart = async (): Promise<CartResponse> => {
    const response = await axiosClient.get<CartResponse>('/cart');
    return response.data;
};

export const addToCartApi = async (productId: string, quantity: number = 1, varient: string = 'Standard') => {
    const response = await axiosClient.post('/cart', { productId, quantity, varient });
    return response.data;
};

export const updateCartItemApi = async (itemId: string, quantity: number) => {
    const response = await axiosClient.put(`/cart/${itemId}`, { quantity });
    return response.data;
};

export const removeFromCartApi = async (itemId: string) => {
    const response = await axiosClient.delete(`/cart/${itemId}`);
    return response.data;
}