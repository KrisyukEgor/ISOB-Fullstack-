import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container>
        <Row>
          <Col className="text-center text-muted">
            {new Date().getFullYear()} Todo Application
          </Col>
        </Row>
      </Container>
    </footer>
  );
};