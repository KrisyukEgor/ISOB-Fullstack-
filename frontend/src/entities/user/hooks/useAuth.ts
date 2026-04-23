import { useState, useEffect, useCallback } from 'react';
import type { User } from '../model/types';
import { authApi } from '../api/authApi';


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    try {
      const userData = await authApi.getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } 
    catch {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    } 
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((access: string) => {
    localStorage.setItem('accessToken', access);
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } 
    catch {
      //
    }
    finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refetch: checkAuth,
  };
};