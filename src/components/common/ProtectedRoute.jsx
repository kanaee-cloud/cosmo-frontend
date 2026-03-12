// src/components/common/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute = () => {
  const session = useAuthStore((state) => state.session);
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};