// pages/CheckoutPage.js - Strona finalizacji zamówienia
// F8 - Proces zakupu z wyborem dostawy i płatności

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  // Koszty dostawy
  const shippingCosts = {
    courier: 15,
    inpost: 12,
    pickup: 0
  };

  const totalPrice = getTotalPrice() + shippingCosts[shippingMethod];

  // Obsługa złożenia zamówienia
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Przygotowanie danych zamówienia
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingMethod,
        paymentMethod
      };

      // Wysłanie zamówienia do API
      const order = await createOrder(orderData);

      // Wyczyszczenie koszyka
      clearCart();

      // Przekierowanie do panelu użytkownika
      alert(`Zamówienie #${order.id} zostało złożone! Całkowita kwota: ${totalPrice} zł`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Błąd składania zamówienia:', error);
      alert('Nie udało się złożyć zamówienia. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Finalizacja zamówienia</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Podsumowanie produktów */}
        <div className="checkout-section">
          <h2>Twoje produkty</h2>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.name} x {item.quantity}</span>
              <span>{item.price * item.quantity} zł</span>
            </div>
          ))}
        </div>

        {/* Wybór metody dostawy */}
        <div className="checkout-section">
          <h2>Metoda dostawy</h2>
          <label className="radio-label">
            <input
              type="radio"
              value="courier"
              checked={shippingMethod === 'courier'}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            Kurier (15 zł) - dostawa 1-2 dni
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="inpost"
              checked={shippingMethod === 'inpost'}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            InPost Paczkomat (12 zł) - dostawa 1-2 dni
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="pickup"
              checked={shippingMethod === 'pickup'}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            Odbiór osobisty (0 zł)
          </label>
        </div>

        {/* Wybór metody płatności */}
        <div className="checkout-section">
          <h2>Metoda płatności</h2>
          <label className="radio-label">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Karta płatnicza
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="blik"
              checked={paymentMethod === 'blik'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            BLIK
          </label>
        </div>

        {/* Podsumowanie całkowite */}
        <div className="checkout-summary">
          <div className="summary-row">
            <span>Produkty:</span>
            <span>{getTotalPrice()} zł</span>
          </div>
          <div className="summary-row">
            <span>Dostawa:</span>
            <span>{shippingCosts[shippingMethod]} zł</span>
          </div>
          <div className="summary-total">
            <span>Do zapłaty:</span>
            <span>{totalPrice} zł</span>
          </div>
        </div>

        <button type="submit" className="place-order-btn" disabled={loading}>
          {loading ? 'Składanie zamówienia...' : 'Złóż zamówienie'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
