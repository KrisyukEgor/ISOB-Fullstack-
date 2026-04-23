import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../../entities/user/hooks/useLogout';
import { useAuth } from '../../../entities/user/hooks/useAuth';
import { ROUTES } from '../../../shared/config/routes';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout: storeLogout } = useAuth();
  const { logout: apiLogout, isLoading } = useLogout();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } 
    catch {
      // 
    }
     finally {
      storeLogout();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Выход...' : 'Выйти'}
    </Button>
  );
};