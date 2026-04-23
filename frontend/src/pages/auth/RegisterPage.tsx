import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../features/auth/register/ui/RegisterForm';
import { ROUTES } from '../../shared/config/routes';


export const RegisterPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Регистрация</h2>
              <RegisterForm />
              <div className="text-center mt-3">
                Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};