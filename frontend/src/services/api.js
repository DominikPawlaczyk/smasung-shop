// services/api.js - Serwis komunikacji z REST API
// Centralizuje wszystkie wywołania HTTP do backendu

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Konfiguracja axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor dodający token JWT do każdego requesta
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// === AUTENTYKACJA ===

// F1 - Rejestracja użytkownika
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// F2 - Logowanie użytkownika
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// === PRODUKTY ===

// F3 - Pobieranie wszystkich produktów
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Pobieranie pojedynczego produktu
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// F4 - Wyszukiwanie produktów
export const searchProducts = async (query) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

// F5 - Filtrowanie produktów
export const filterProducts = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/products/filter?${params}`);
  return response.data;
};

// F10 - Zarządzanie produktami (admin)
export const addProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// === ZAMÓWIENIA ===

// F8 - Tworzenie zamówienia
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// F9 - Pobieranie zamówień użytkownika
export const getUserOrders = async () => {
  const response = await api.get('/orders/my');
  return response.data;
};

// F11 - Zarządzanie zamówieniami (admin)
export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};

// === UŻYTKOWNIK ===

// F9 - Pobieranie profilu użytkownika
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// F9 - Aktualizacja profilu użytkownika
export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export default api;
