import { useState } from 'react';
import type { LoginDto } from '../model/types';
import { authApi } from '../api/authApi';


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (data: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      return await authApi.login(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};