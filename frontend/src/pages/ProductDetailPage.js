// pages/ProductDetailPage.js - Strona szczegółów produktu
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Błąd pobierania produktu:', error);
      alert('Nie znaleziono produktu');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Dodano ${quantity}x ${product.name} do koszyka!`);
  };

  if (loading) return <div className="product-detail-page">Ładowanie...</div>;
  if (!product) return <div className="product-detail-page">Produkt nie znaleziony</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-model">{product.model}</p>
          <p className="product-sku">SKU: {product.sku}</p>
          
          <p className="product-price">{product.price} zł</p>
          
          <p className="product-description">{product.description}</p>

          <div className="product-specs">
            <h3>Specyfikacja techniczna:</h3>
            <ul>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">Dostępne: {product.stock} szt.</span>
            ) : (
              <span className="out-of-stock">Brak w magazynie</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label>Ilość:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-btn-large">
                Dodaj do koszyka
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
