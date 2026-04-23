import { useState } from 'react';
import { authApi } from '../api/authApi';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authApi.logout();
    } 
    catch (err) {
      setError(err as Error);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};