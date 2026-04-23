import { Container, Row, Col } from 'react-bootstrap';
import { SafeMethodForm } from '../../features/sql-injection/SafeMethodForm';
import { UnsafeMethodForm } from '../../features/sql-injection/UnsafeMethodForm';

export const SqlInjectionPage = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">SQL-инъекции</h1>
      <Row>
        <Col lg={6}>
          <SafeMethodForm />
        </Col>
        <Col lg={6}>
          <UnsafeMethodForm />
        </Col>
      </Row>
    </Container>
  );
};