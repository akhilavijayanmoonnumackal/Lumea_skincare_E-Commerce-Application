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
    variant?: string;
}

export interface CartResponseData {
    _id?: string;
    user?: string;
    items: CartItemBackend[];
    totalAmount?: number;
}

export interface CartResponse {
    success: boolean;
    message?: string;
    data: CartResponse;
    items?: CartItemBackend[];
}

export const getCart = async (): Promise<CartResponse> => {
    const response = await axiosClient.get<CartResponse>('/cart');
    return response.data;
};

export const addToCartApi = async (productId: string, quantity: number = 1, variant: string = 'Standard'): Promise<CartResponse> => {
    const response = await axiosClient.post<CartResponse>('/cart', { productId, quantity, variant });
    return response.data;
};

export const updateCartItemApi = async (productId: string, quantity: number): Promise<CartResponse> => {
    const response = await axiosClient.put<CartResponse>(`/cart/${productId}`, { quantity });
    return response.data;
};

export const removeFromCartApi = async (productId: string): Promise<CartResponse> => {
    const response = await axiosClient.delete<CartResponse>(`/cart/${productId}`);
    return response.data;
}