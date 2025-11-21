// controllers/authController.js - Kontroler autentykacji (warstwa kontrolera)
// Obsługuje requesty HTTP związane z rejestracją i logowaniem

const authService = require('../services/authService');

class AuthController {
  // F1 - Endpoint rejestracji
  async register(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Walidacja danych wejściowych
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
      }

      const result = await authService.register(email, password, firstName, lastName);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // F2 - Endpoint logowania
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Walidacja danych wejściowych
      if (!email || !password) {
        return res.status(400).json({ error: 'Email i hasło są wymagane' });
      }

      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
