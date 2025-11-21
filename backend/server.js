// server.js - Główny plik serwera Express
// Implementuje wzorzec architektoniczny: Architektura warstwowa (Layered Architecture)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routerów (warstwa routingu)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - warstwa pośrednia
app.use(cors()); // Umożliwia komunikację między frontendem a backendem
app.use(express.json()); // Parsowanie JSON z requestów

// Routing - definicja endpointów REST API
app.use('/api/auth', authRoutes);       // F1, F2 - Rejestracja i logowanie
app.use('/api/products', productRoutes); // F3, F4, F5, F10 - Produkty
app.use('/api/orders', orderRoutes);     // F8, F11 - Zamówienia
app.use('/api/users', userRoutes);       // F9 - Panel użytkownika

// Endpoint testowy
app.get('/', (req, res) => {
  res.json({ message: 'Samsung Shop API - działa poprawnie' });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;
