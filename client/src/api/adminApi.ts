import axiosClient from './axiosClient';

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
}

export const getAdminStats = async () => {
  const response = await axiosClient.get('/admin/dashboard-stats');
  return response.data;
};

export const getAllAdminOrders = async () => {
  const response = await axiosClient.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axiosClient.put(`/admin/orders/${orderId}/status`, { orderStatus: status });
  return response.data;
};