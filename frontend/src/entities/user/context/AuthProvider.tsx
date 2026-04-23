import React, { useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/authApi';
import type { User } from '../model/types';
import { AuthContext } from './AuthContext'; 

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const userData = await authApi.getMe();
      setUser(userData);
    } catch {
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (access: string) => {
    localStorage.setItem('accessToken', access);
    await checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      //
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
