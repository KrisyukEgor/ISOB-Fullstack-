import { useState } from "react";
import { todoApi } from "../api/todoApi";
import type { TodoDTO } from "../model/todo";


export const useCreateTodo = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTodo = async (data: TodoDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      const newTodo = await todoApi.create(data);
      onSuccess?.();
      return newTodo;
    } 
    catch (err) {
      setError(err as Error);
      throw err;
    } 
    finally {
      setIsLoading(false);
    }
  };

  return { createTodo, isLoading, error };
};