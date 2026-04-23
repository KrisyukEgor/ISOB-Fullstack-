import { useState } from "react";
import { useCreateTodo } from "../../../entities/todo/hooks/useCreateTodo";
import { Alert, Button, Form } from "react-bootstrap";

interface FormData {
  title: string;
  description: string;
}

export const CreateTodoForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<FormData>({ title: '', description: '' });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const { createTodo, isLoading, error: apiError } = useCreateTodo(onSuccess);

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await createTodo({
        ...formData,
        is_completed: false
      });

      setFormData({ title: '', description: '' });
    } 
    catch {
      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };


  return (
    <Form onSubmit={handleSubmit} className="mb-4">
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
          rows={2}
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Добавить задачу'}
      </Button>
    </Form>
  );

}