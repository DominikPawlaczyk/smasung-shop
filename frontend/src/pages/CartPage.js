// pages/CartPage.js - Strona koszyka zakupowego
// F6, F7 - Wyświetlanie i edycja koszyka

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Obsługa przejścia do checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Musisz być zalogowany, aby złożyć zamówienie');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  // Pusty koszyk
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Koszyk</h1>
        <div className="empty-cart">
          <p>Twój koszyk jest pusty</p>
          <Link to="/products" className="continue-shopping-btn">
            Kontynuuj zakupy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Koszyk zakupowy</h1>

      <div className="cart-content">
        {/* Lista produktów w koszyku */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-model">{item.model}</p>
                <p className="cart-item-price">{item.price} zł</p>
              </div>

              {/* F7 - Kontrola ilości */}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <p>{item.price * item.quantity} zł</p>
              </div>

              {/* F7 - Usuwanie z koszyka */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Usuń
              </button>
            </div>
          ))}
        </div>

        {/* Podsumowanie koszyka */}
        <div className="cart-summary">
          <h2>Podsumowanie</h2>
          <div className="summary-row">
            <span>Produkty ({cartItems.length}):</span>
            <span>{getTotalPrice()} zł</span>
          </div>
          <div className="summary-row">
            <span>Dostawa:</span>
            <span>Obliczana przy checkout</span>
          </div>
          <div className="summary-total">
            <span>Razem:</span>
            <span>{getTotalPrice()} zł</span>
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            Przejdź do kasy
          </button>

          <Link to="/products" className="continue-shopping-link">
            Kontynuuj zakupy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
