// pages/ProductsPage.js - Strona katalogu produktów
// F3, F4, F5 - Przeglądanie, wyszukiwanie i filtrowanie produktów

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, searchProducts, filterProducts } from '../services/api';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  // Stany dla filtrów
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Pobieranie produktów przy załadowaniu strony
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Błąd pobierania produktów:', error);
      alert('Nie udało się pobrać produktów');
    } finally {
      setLoading(false);
    }
  };

  // F4 - Obsługa wyszukiwania
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
    } finally {
      setLoading(false);
    }
  };

  // F5 - Obsługa filtrowania
  const handleFilter = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (categoryFilter) filters.category = categoryFilter;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;
      if (inStockOnly) filters.inStock = 'true';

      const data = await filterProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Błąd filtrowania:', error);
    } finally {
      setLoading(false);
    }
  };

  // Resetowanie filtrów
  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    loadProducts();
  };

  return (
    <div className="products-page">
      <h1>Katalog produktów Samsung</h1>

      {/* F4 - Wyszukiwarka */}
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Szukaj produktów (nazwa, model, kategoria)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Szukaj</button>
        </form>
      </div>

      {/* F5 - Filtry */}
      <div className="filters-section">
        <h3>Filtry</h3>
        <div className="filters-grid">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Wszystkie kategorie</option>
            <option value="smartphone">Smartfony</option>
            <option value="accessory">Akcesoria</option>
          </select>

          <input
            type="number"
            placeholder="Cena min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Cena max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            Tylko dostępne
          </label>

          <button onClick={handleFilter} className="filter-btn">Filtruj</button>
          <button onClick={resetFilters} className="reset-btn">Resetuj</button>
        </div>
      </div>

      {/* Lista produktów */}
      {loading ? (
        <p>Ładowanie produktów...</p>
      ) : (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Nie znaleziono produktów</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
