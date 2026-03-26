import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const PublicRoute = ({ children }) => {
  const session = useAuthStore((state) => state.session);
  // Simpan state session saat komponen pertama kali dirender
  // Ini mencegah PublicRoute langsung menendang user ke dashboard 
  // tepat setelah login berhasil (agar SuccessModal sempat tampil 3 detik)
  const [initialSession] = useState(session);
  
  if (initialSession) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika di tengah jalan session berubah jadi ada (baru saja login),
  // percayakan proses navigasinya (redirect) ke komponen child (Login.jsx/Register.jsx)
  return children ? children : <Outlet />;
};