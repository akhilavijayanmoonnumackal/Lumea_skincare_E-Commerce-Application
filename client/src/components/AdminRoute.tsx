import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const token = localStorage.getItem('token');
  const userInfoStr = localStorage.getItem('userInfo');
  
  let user = null;
  try {
    user = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (e) {
    console.error('Error parsing userInfo', e);
  }

  const isAdmin = token && user && (user.role === 'admin' || user.role === 'superadmin');

  if (!isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}