// middleware/auth.js - Middleware do weryfikacji JWT i autoryzacji

const jwt = require('jsonwebtoken');

// Middleware weryfikujący token JWT
const authenticateToken = (req, res, next) => {
  // Pobieranie tokenu z nagłówka Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego' });
  }

  // Weryfikacja tokenu
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Nieprawidłowy token' });
    }
    req.user = user; // Dodanie danych użytkownika do requestu
    next();
  });
};

// Middleware sprawdzający czy użytkownik jest adminem
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Brak uprawnień administratora' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
