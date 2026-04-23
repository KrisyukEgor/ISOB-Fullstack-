import { Button } from 'react-bootstrap';
import { useUpdateTodo } from '../../../entities/todo/hooks/useUpdateTodo';

interface ToggleTodoButtonProps {
  todoId: number;
  completed: boolean;
  onSuccess: () => void;
}

export const ToggleTodoButton = ({ todoId, completed, onSuccess }: ToggleTodoButtonProps) => {
  const { updateTodo, isLoading } = useUpdateTodo(onSuccess);

  const handleToggle = async () => {
    try {
      await updateTodo(todoId, { is_completed: !completed });
    } 
    catch {
      //
    }
  };

  return (
    <Button
      variant={completed ? 'success' : 'outline-success'}
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className="me-2"
    >
      {completed ? '✓' : '○'}
    </Button>
  );
};