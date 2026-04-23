import { Container, Row, Col } from 'react-bootstrap';
import { CreateTodoForm } from '../../features/todos/create-todo/CreateTodoForm';
import { TodoList } from '../../features/todos/todo-list/TodoList';
import { useTodos } from '../../entities/todo/hooks/useTodos';

export const TodosPage = () => {
  const { todos, fetchTodos, isLoading, error } = useTodos();

  return (
    <Container className="py-4">
      <Row>
        <Col lg={4}>
          <CreateTodoForm onSuccess={fetchTodos} />
        </Col>
        <Col lg={8}>
          <TodoList todos={todos} isLoading={isLoading} error={error} onUpdate={fetchTodos} />
        </Col>
      </Row>
    </Container>
  );
};