// context/AuthContext.js - Context API dla autentykacji
// Wzorzec: Context API + Provider Pattern
// Zarządza stanem użytkownika w całej aplikacji

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Hook do łatwego dostępu do kontekstu autentykacji
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Przy starcie aplikacji sprawdź czy użytkownik jest zalogowany (localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // F2 - Funkcja logowania
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Funkcja wylogowania
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Sprawdzenie czy użytkownik jest adminem
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Wartości dostępne w całej aplikacji
  const value = {
    user,
    token,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
