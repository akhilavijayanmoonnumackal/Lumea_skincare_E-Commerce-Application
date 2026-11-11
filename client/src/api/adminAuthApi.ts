import axiosClient from './axiosClient';

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminUser {
  _id: string;
  name?: string;
  adminUserName?: string;
  email: string;
  role?: string;
  adminUserType?: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  data: {
    user?: AdminUser;
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    adminUserType?: string;
  } | AdminUser;
}

export const adminLogin = async (payload: AdminLoginPayload): Promise<AdminLoginResponse> => {
  const response = await axiosClient.post('/auth/login', payload);
  return response.data;
};

export const getAdminProfile = async (): Promise<{ success: boolean; data: AdminUser }> => {
  const response = await axiosClient.get('/auth/profile');
  return response.data;
};