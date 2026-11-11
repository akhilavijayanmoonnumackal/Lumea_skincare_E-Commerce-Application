import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const userInfoStr = localStorage.getItem('userInfo');

    if(!token || !userInfoStr) {
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} replace />
    }
    return <Outlet />
};