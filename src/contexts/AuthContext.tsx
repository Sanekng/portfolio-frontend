import React, { createContext, useContext, useState, useEffect } from 'react';
import { type User, type LoginData, type RegisterData } from '../types/auth.types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = authService.getToken();
        console.log('Auth check - Token exists:', !!token);

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authService.getMe();
            console.log('Auth check successful, user:', response.data.user);
            setUser(response.data.user);
        } catch (error: any) {
            console.error('Auth check failed:', error);
            if (error.response?.status === 401) {
                authService.logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginData) => {
        console.log('Attempting login...');
        const response = await authService.login(data);
        console.log('Login successful, user:', response.data.user);
        setUser(response.data.user);
    };

    const register = async (data: RegisterData) => {
        const response = await authService.register(data);
        setUser(response.data.user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};