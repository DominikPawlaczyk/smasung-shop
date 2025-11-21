// services/authService.js - Warstwa logiki biznesowej dla autentykacji
// Implementuje wzorzec Singleton - jedna instancja serwisu w całej aplikacji

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, users } = require('../models/User');

// Wzorzec Singleton - zapewnia jedną instancję AuthService
class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Zwraca istniejącą instancję
    }
    AuthService.instance = this;
  }

  // F1 - Rejestracja użytkownika
  async register(email, password, firstName, lastName) {
    // Sprawdzenie czy użytkownik już istnieje
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Użytkownik o tym adresie email już istnieje');
    }

    // Tworzenie nowego użytkownika (mockowe hashowanie hasła)
    const newUser = new User(
      users.length + 1,
      email,
      `hashed_${password}`, // W prawdziwej aplikacji: await bcrypt.hash(password, 10)
      firstName,
      lastName
    );

    users.push(newUser);
    
    // Generowanie tokenu JWT
    const token = this.generateToken(newUser);
    
    return { user: this.sanitizeUser(newUser), token };
  }

  // F2 - Logowanie użytkownika
  async login(email, password) {
    // Wyszukanie użytkownika
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Nieprawidłowy email lub hasło');
    }

    // Weryfikacja hasła (mockowa)
    const isPasswordValid = user.password === `hashed_${password}` || 
                           user.password === '$2a$10$mockHashedPassword';
    
    if (!isPasswordValid) {
      throw new Error('Nieprawidłowy email lub hasło');
    }

    // Generowanie tokenu JWT
    const token = this.generateToken(user);
    
    return { user: this.sanitizeUser(user), token };
  }

  // Generowanie tokenu JWT
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Usunięcie wrażliwych danych (hasło) z obiektu użytkownika
  sanitizeUser(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Eksport instancji Singleton
module.exports = new AuthService();
