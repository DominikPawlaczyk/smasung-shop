// components/ProtectedRoute.js - Komponent chroniący ścieżki przed nieautoryzowanym dostępem
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Jeśli użytkownik nie jest zalogowany, przekieruj do logowania
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli ścieżka wymaga uprawnień admina, sprawdź rolę
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
