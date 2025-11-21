// context/CartContext.js - Context API dla koszyka zakupowego
// Wzorzec: Singleton Pattern (jedna instancja koszyka) + Context API
// F6, F7 - Zarządzanie koszykiem

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// Hook do łatwego dostępu do kontekstu koszyka
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart musi być użyty wewnątrz CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Wczytanie koszyka z localStorage przy starcie
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Zapisanie koszyka do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // F6 - Dodawanie produktu do koszyka
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Sprawdź czy produkt już jest w koszyku
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Zwiększ ilość istniejącego produktu
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Dodaj nowy produkt do koszyka
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // F7 - Usuwanie produktu z koszyka
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // F7 - Aktualizacja ilości produktu w koszyku
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Czyszczenie koszyka (po złożeniu zamówienia)
  const clearCart = () => {
    setCartItems([]);
  };

  // Obliczanie całkowitej ceny koszyka
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Liczba produktów w koszyku
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
