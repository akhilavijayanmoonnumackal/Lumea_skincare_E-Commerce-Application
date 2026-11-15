import axiosClient from "./axiosClient";

export interface Category {
    _id: string;
    name: string;
    slug: string;
    productCount: number;
    status: 'Active' | 'Inactive';

}

export interface CategoryResponse {
    success: boolean;
    data: Category[];
}

export const getCategories = async (): Promise<CategoryResponse> => {
    const response = await axiosClient.get<CategoryResponse>('/categories');
    return response.data;
};