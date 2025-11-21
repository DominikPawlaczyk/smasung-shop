// components/Navbar.js - Komponent nawigacji
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Samsung Shop
        </Link>

        {/* Menu nawigacyjne */}
        <ul className="navbar-menu">
          <li><Link to="/">Strona główna</Link></li>
          <li><Link to="/products">Produkty</Link></li>
          
          {/* Koszyk z licznikiem produktów */}
          <li>
            <Link to="/cart" className="cart-link">
              Koszyk ({getCartCount()})
            </Link>
          </li>

          {/* Menu dla zalogowanych użytkowników */}
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Moje konto</Link></li>
              {isAdmin() && <li><Link to="/admin">Panel Admin</Link></li>}
              <li>
                <button onClick={logout} className="logout-btn">
                  Wyloguj ({user.firstName})
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Logowanie</Link></li>
              <li><Link to="/register">Rejestracja</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
