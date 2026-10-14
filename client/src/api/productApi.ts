import axiosClient from "./axiosClient";

export interface CategoryObject {
  _id?: string;
  name?: string;
  slug?: string;
}

export interface Product {
    _id: string;
    title: string;
    category: string | CategoryObject;
    badge?: string | null;
    badgeType?: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    imageUrl: string;
    link: string;
}

export interface ProductResponse {
    success: boolean;
    data: Product[];
}

export const getProducts = async (): Promise<ProductResponse> => {
    const response = await axiosClient.get<ProductResponse>('/products');
    return response.data;
}