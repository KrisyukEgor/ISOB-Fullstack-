import { useState } from 'react';
import type { RegisterDto } from '../model/types';
import { authApi } from '../api/authApi';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (data: RegisterDto) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.register(data);
    } 
    catch (err) {
      setError(err as Error);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};