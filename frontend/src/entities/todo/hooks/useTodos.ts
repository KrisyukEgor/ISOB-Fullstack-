import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../model/todo";
import { todoApi } from "../api/todoApi";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await todoApi.getList();
      setTodos(data);
    }
    catch(err) {
      setError(err as Error);
      throw err;
    }
    finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])
  
  return {todos, isLoading, error, fetchTodos}
}