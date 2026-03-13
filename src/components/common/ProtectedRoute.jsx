import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute = ({ children }) => {
  const session = useAuthStore((state) => state.session);
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};