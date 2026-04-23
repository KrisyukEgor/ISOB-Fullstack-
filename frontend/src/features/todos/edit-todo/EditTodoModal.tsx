import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useUpdateTodo } from '../../../entities/todo/hooks/useUpdateTodo';
import type { Todo } from '../../../entities/todo/model/todo';

interface EditTodoModalProps {
  todo: Todo;
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export const EditTodoModal = ({ todo, show, onHide, onSuccess }: EditTodoModalProps) => {
  const [formData, setFormData] = useState({ title: todo.title, description: todo.description || '' });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const { updateTodo, isLoading, error: apiError } = useUpdateTodo(() => {
    onSuccess();
    onHide();
  });

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await updateTodo(todo.id, formData);
    } catch {
      //
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать задачу</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {apiError && <Alert variant="danger">{apiError.message}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};