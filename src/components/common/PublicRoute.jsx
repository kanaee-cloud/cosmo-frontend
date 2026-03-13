import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const PublicRoute = ({ children }) => {
  const session = useAuthStore((state) => state.session);
  
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};