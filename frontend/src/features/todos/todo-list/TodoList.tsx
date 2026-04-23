import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { TodoItem } from './TodoItem';
import type { Todo } from '../../../entities/todo/model/todo';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null | any;
  onUpdate: () => void;
}

export const TodoList = ({ todos, isLoading, error, onUpdate }: TodoListProps) => {
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

  if (!todos?.length) {
    return <Alert variant="info">У вас пока нет задач. Создайте новую!</Alert>;
  }

  return (
    <ListGroup>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
      ))}
    </ListGroup>
  );
};
