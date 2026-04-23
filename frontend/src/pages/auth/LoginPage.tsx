import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/config/routes';
import { LoginForm } from '../../features/auth/login/LoginForm';

export const LoginPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Вход</h2>
              <LoginForm />
              <div className="text-center mt-3">
                Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};