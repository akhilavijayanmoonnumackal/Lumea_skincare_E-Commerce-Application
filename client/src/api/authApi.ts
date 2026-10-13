import axiosClient from "./axiosClient";

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: {
        _id: string;
        name: string;
        email: string;
        role?: string;
    };

    data?: {
        token: string;
        user: {
            _id: string;
            name: string;
            email: string;
            role?: string;
        };
    };
}

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/user-auth/register', payload);
    return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/user-auth/login', payload);
    return response.data;
};

export const getProfile = async (): Promise<AuthResponse> => {
    const response = await axiosClient.get<AuthResponse>('/user-auth/profile');
    return response.data;
}