import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { loginUser, registerUser, getProfile, type LoginPayload, type RegisterPayload } from "../api/authApi";

interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginPayload) => Promise<void>;
    register: (credentials: RegisterPayload) => Promise<void>;
    logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('lumea_token'));
    const [loading, setLoading] = useState<boolean>(true);

    function logout() {
        localStorage.removeItem('lumea_token');
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = localStorage.getItem('lumea_token');
            if (savedToken) {
                try {
                    const res = await getProfile();
                    if(res.success && res.user) {
                        setUser(res.user);
                        setToken(savedToken);
                    } else {
                        logout();
                    }
                } catch {
                    logout();
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (credentials: LoginPayload) => {
        const res = await loginUser(credentials);
        if(res.success && res.token && res.user) {
            localStorage.setItem('lumea_token', res.token);
            setToken(res.token);
            setUser(res.user);
        } else {
            throw new Error(res.message || 'Login failed');
        }
    };

    const register = async (credentials: RegisterPayload) => {
        const res = await registerUser(credentials);
        if(res.success && res.token && res.user) {
            localStorage.setItem('lumea_token', res.token);
            setToken(res.token);
            setUser(res.user);
        } else {
            throw new Error(res.message || 'Registration failed');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !user,
                loading,
                login,
                register,
                logout,
            }}
        >

            {children}
        </AuthContext.Provider>
    );
};
