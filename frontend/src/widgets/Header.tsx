import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../entities/user/hooks/useLogout';
import { useAuth } from '../entities/user/hooks/useAuth';
import { ROUTES } from '../shared/config/routes';

export const Header = () => {
  const { isAuthenticated, isLoading, logout: contextLogout } = useAuth();
  const { logout: apiLogout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
      await contextLogout();
    } 
    catch {
      await contextLogout();
    } 
    finally {
      localStorage.removeItem('accessToken');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME}>
          Todo App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Nav.Link as={Link} to={ROUTES.TODOS}>
                      Мои задачи
                    </Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.INJECTION}>
                      SQL Инъекции
                    </Nav.Link>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                      className="ms-2"
                    >
                      Выйти
                    </Button>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to={ROUTES.LOGIN}>
                      Войти
                    </Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.REGISTER}>
                      Регистрация
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};