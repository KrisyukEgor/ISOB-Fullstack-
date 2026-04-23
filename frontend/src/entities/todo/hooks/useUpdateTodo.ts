import { useState } from "react";
import type { TodoDTO } from "../model/todo";
import { todoApi } from "../api/todoApi";


export const useUpdateTodo = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTodo = async (id: number, data: Partial<TodoDTO>) => {
    setIsLoading(true);
    setError(null);

    try {
      const updated = await todoApi.update(id, data);
      onSuccess?.();
      return updated;
    }
    catch(err) {
      setError(err as Error);
      throw err;
    }
    finally {
      setIsLoading(false);
    }
  }
  
  return {isLoading, error, updateTodo};
}