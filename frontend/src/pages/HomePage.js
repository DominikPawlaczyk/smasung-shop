// pages/HomePage.js - Strona główna sklepu
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Sekcja hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Witaj w Samsung Shop</h1>
          <p>Odkryj najnowsze smartfony i akcesoria Samsung</p>
          <Link to="/products" className="cta-button">
            Zobacz produkty
          </Link>
        </div>
      </section>

      {/* Sekcja z kategoriami */}
      <section className="categories-section">
        <h2>Kategorie produktów</h2>
        <div className="categories-grid">
          <Link to="/products?category=smartphone" className="category-card">
            <h3>Smartfony</h3>
            <p>Galaxy S24, Z Fold i więcej</p>
          </Link>
          <Link to="/products?category=accessory" className="category-card">
            <h3>Akcesoria</h3>
            <p>Słuchawki, ładowarki, etui</p>
          </Link>
        </div>
      </section>

      {/* Sekcja z zaletami */}
      <section className="features-section">
        <h2>Dlaczego my?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>🚚 Darmowa dostawa</h3>
            <p>Przy zamówieniach powyżej 500 zł</p>
          </div>
          <div className="feature">
            <h3>🔒 Bezpieczne płatności</h3>
            <p>Karta, PayPal, BLIK</p>
          </div>
          <div className="feature">
            <h3>✅ Gwarancja</h3>
            <p>24 miesiące gwarancji producenta</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
