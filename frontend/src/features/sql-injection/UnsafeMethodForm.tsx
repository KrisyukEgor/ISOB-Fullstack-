import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useUnsafeMethod } from '../../entities/todo/hooks/useUnsafeMethod';

export const UnsafeMethodForm = () => {
  const [title, setTitle] = useState('');
  const { execute, isLoading, error, data } = useUnsafeMethod();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await execute(title);
    } catch {
      // 
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-danger text-white">
        <h5 className="mb-0">Уязвимый метод (конкатенация строк)</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название задачи для поиска</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите значение"
            />
            <Form.Text className="text-muted">
              Пример инъекции: <code>'; DROP TABLE api_todo; --</code>
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="danger" disabled={isLoading}>
            {isLoading ? 'Выполнение...' : 'Выполнить уязвимый запрос'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
        {data && (
          <Alert variant="warning" className="mt-3">
            <strong>Результат:</strong>
            <pre className="mb-0 mt-2">{JSON.stringify(data, null, 2)}</pre>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

