import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from 'react-bootstrap';
import { useAuth } from '../entities/user/hooks/useAuth';
import { ROUTES } from '../shared/config/routes';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};