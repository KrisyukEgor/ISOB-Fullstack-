import { Button } from 'react-bootstrap';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';

interface DeleteTodoButtonProps {
  todoId: number;
  onSuccess: () => void;
}

export const DeleteTodoButton = ({ todoId, onSuccess }: DeleteTodoButtonProps) => {
  const { deleteTodo, isLoading } = useDeleteTodo(onSuccess);

  const handleDelete = async () => {
    if (window.confirm('Удалить задачу?')) {
      try {
        await deleteTodo(todoId);
      } catch {
        //
      }
    }
  };

  return (
    <Button
      variant="danger"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? 'Удаление...' : 'Удалить'}
    </Button>
  );
};