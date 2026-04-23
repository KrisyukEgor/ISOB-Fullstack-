import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import type { Todo } from '../../../entities/todo/model/todo';
import { ToggleTodoButton } from '../toggle-todo/ToggleTodoButton';
import { DeleteTodoButton } from '../delete-todo/DeleteTodoButton';
import { EditTodoModal } from '../edit-todo/EditTodoModal';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div
          className="ms-2 me-auto"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowEditModal(true)}
        >
          <div
            className="fw-bold"
            style={{ textDecoration: todo.is_completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </div>
          {todo.description && <div>{todo.description}</div>}
        </div>
        <div>
          <ToggleTodoButton todoId={todo.id} completed={todo.is_completed} onSuccess={onUpdate} />
          <DeleteTodoButton todoId={todo.id} onSuccess={onUpdate} />
        </div>
      </ListGroup.Item>

      <EditTodoModal
        todo={todo}
        show={showEditModal}
        key={todo.id} 
        onHide={() => setShowEditModal(false)}
        onSuccess={onUpdate}
      />
    </>
  );
};