import { api } from "../../../shared/api/base";
import type { Todo, TodoDTO } from "../model/todo";

export const todoApi = {
  getList: () => api.get<Todo[]>('/todos/').then(res => res.data),
  getById: (id: number) => api.get<Todo>(`/todos/${id}/`).then(res => res.data),

  create: (data: TodoDTO) => api.post<Todo>('/todos/', data).then(res => res.data),
  update: (id: number, data: Partial<TodoDTO>) =>
    api.patch<Todo>(`/todos/${id}/`, data).then(res => res.data),

  delete: (id: number) => api.delete(`/todos/${id}/`).then(res => res.data),

  safeMethod: (title: string) =>
    api.get('/todos/safe-method/', { params: { title } }).then(res => res.data),

  unsafeMethod: (title: string) =>
    api.get('/todos/unsafe-method/', { params: { title } }).then(res => res.data),
};