// pages/LoginPage.js - Strona logowania
// F2 - Logowanie użytkownika

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/api';
import '../styles/AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Obsługa formularza logowania
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Walidacja
    if (!email || !password) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    try {
      setLoading(true);
      // Wywołanie API logowania
      const data = await loginApi({ email, password });
      
      // Zapisanie danych użytkownika w kontekście
      login(data.user, data.token);
      
      // Przekierowanie do strony głównej
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd logowania');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Logowanie</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Hasło:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <p className="auth-link">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>

        {/* Dane testowe dla ułatwienia */}
        <div className="test-credentials">
          <p><strong>Dane testowe:</strong></p>
          <p>Admin: admin@samsung.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
