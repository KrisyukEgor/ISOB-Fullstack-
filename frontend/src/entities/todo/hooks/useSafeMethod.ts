import { useState } from 'react';
import { todoApi } from '../api/todoApi';

export const useSafeMethod = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const execute = async (title: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await todoApi.safeMethod(title);
      setData(result);

      return result;
    } 
    catch (err) {
      setError(err as Error);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  const resetData = () => setData(null);

  return { execute, resetData, isLoading, error, data };
};