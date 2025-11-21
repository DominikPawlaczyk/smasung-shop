// components/ProductCard.js - Komponent karty produktu
// Wyświetla pojedynczy produkt w katalogu

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // F6 - Obsługa dodawania do koszyka
  const handleAddToCart = (e) => {
    e.preventDefault(); // Zapobiega przejściu do strony produktu
    addToCart(product);
    alert(`${product.name} dodano do koszyka!`);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        {/* Zdjęcie produktu */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Informacje o produkcie */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-model">{product.model}</p>
          <p className="product-price">{product.price} zł</p>
          
          {/* Status dostępności */}
          <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Dostępne: ${product.stock} szt.` : 'Brak w magazynie'}
          </p>
        </div>
      </Link>

      {/* Przycisk dodawania do koszyka */}
      <button 
        onClick={handleAddToCart} 
        className="add-to-cart-btn"
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? 'Dodaj do koszyka' : 'Niedostępny'}
      </button>
    </div>
  );
};

export default ProductCard;
