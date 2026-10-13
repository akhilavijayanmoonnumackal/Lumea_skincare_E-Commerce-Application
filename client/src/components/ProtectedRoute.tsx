import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/useAuth';

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">Loading Luméa...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace/>;
};