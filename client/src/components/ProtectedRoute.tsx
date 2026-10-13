import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/useAuth';

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return <div className="flex items-center justify-center h-screen">Loading Luméa...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace/>;
};