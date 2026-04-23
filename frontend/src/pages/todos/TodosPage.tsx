import { Container, Row, Col } from 'react-bootstrap';
import { CreateTodoForm } from '../../features/todos/create-todo/CreateTodoForm';
import { TodoList } from '../../features/todos/todo-list/TodoList';
import { useTodos } from '../../entities/todo/hooks/useTodos';

export const TodosPage = () => {
  const { fetchTodos } = useTodos();

  return (
    <Container className="py-4">
      <h1 className="mb-4">Мои задачи</h1>
      <Row>
        <Col lg={4}>
          <CreateTodoForm onSuccess={fetchTodos} />
        </Col>
        <Col lg={8}>
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};