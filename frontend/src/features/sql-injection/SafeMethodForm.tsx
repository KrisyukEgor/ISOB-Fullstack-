import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useSafeMethod } from '../../entities/todo/hooks/useSafeMethod';


export const SafeMethodForm = () => {
  const [title, setTitle] = useState('');
  const { execute, isLoading, error, data } = useSafeMethod();

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
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0">Безопасный метод (параметризованный запрос)</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название задачи для поиска</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Test' OR '1'='1"
            />
          </Form.Group>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Выполнение...' : 'Выполнить безопасный запрос'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
        {data && (
          <Alert variant="info" className="mt-3">
            <strong>Результат:</strong>
            <pre className="mb-0 mt-2">{JSON.stringify(data, null, 2)}</pre>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};