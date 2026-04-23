import { ListGroup, Spinner, Alert } from 'react-bootstrap';

import { TodoItem } from './TodoItem';
import { useTodos } from '../../../entities/todo/hooks/useTodos';

export const TodoList = () => {
  const { todos, isLoading, error, fetchTodos } = useTodos();

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Ошибка загрузки задач: {error.message}</Alert>;
  }

  if (!todos.length) {
    return <Alert variant="info">У вас пока нет задач. Создайте новую!</Alert>;
  }

  return (
    <ListGroup>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
      ))}
    </ListGroup>
  );
};