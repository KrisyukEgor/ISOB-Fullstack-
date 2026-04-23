import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../../shared/ui/Layout/MainLayout';
import { ROUTES } from '../../shared/config/routes';
import { LoginPage } from '../../pages/auth/LoginPage';
import { RegisterPage } from '../../pages/auth/RegisterPage';
import { ProtectedRoute } from '../ProtectedRoute';
import { TodosPage } from '../../pages/todos/TodosPage';
import { SqlInjectionPage } from '../../pages/sql-injection/SqlInjectionPage';


export const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.TODOS} replace></Navigate>,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage></LoginPage>,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage></RegisterPage>,
      },
      {
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: ROUTES.TODOS,
            element: <TodosPage></TodosPage>,
          },
        ],
      },
      {
        path: ROUTES.HOME,
        element: <div>Главная страница (Todo List)</div>,
      },
      {
      path: ROUTES.INJECTION,
      element: <SqlInjectionPage></SqlInjectionPage>,
    }
    ],
  },
]);