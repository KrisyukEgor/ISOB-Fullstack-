import { useState } from 'react';
import { todoApi } from '../api/todoApi';


export const useDeleteTodo = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await todoApi.delete(id);
      onSuccess?.();
    } 
    catch (err) {
      setError(err as Error);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return { deleteTodo, isLoading, error };
};