// tests/authService.test.js - Przykładowe testy jednostkowe
// Testy dla serwisu autentykacji

const authService = require('../services/authService');
const { users } = require('../models/User');

describe('AuthService - Testy jednostkowe', () => {
  
  // Test F1 - Rejestracja użytkownika
  describe('Rejestracja użytkownika', () => {
    
    test('powinien pomyślnie zarejestrować nowego użytkownika', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Jan',
        lastName: 'Kowalski'
      };

      const result = await authService.register(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      );

      // Sprawdzenie czy zwrócono użytkownika i token
      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(userData.email);
      expect(result.user.firstName).toBe(userData.firstName);
    });

    test('powinien zwrócić błąd przy próbie rejestracji z istniejącym emailem', async () => {
      // Próba rejestracji z emailem admina
      await expect(
        authService.register('admin@samsung.com', 'password', 'Test', 'User')
      ).rejects.toThrow('Użytkownik o tym adresie email już istnieje');
    });

    test('nie powinien zwracać hasła w odpowiedzi', async () => {
      const result = await authService.register(
        'nopassword@test.com',
        'secret123',
        'No',
        'Password'
      );

      // Sprawdzenie czy hasło nie jest w zwróconym obiekcie
      expect(result.user.password).toBeUndefined();
    });
  });

  // Test F2 - Logowanie użytkownika
  describe('Logowanie użytkownika', () => {
    
    test('powinien pomyślnie zalogować użytkownika z poprawnymi danymi', async () => {
      const result = await authService.login('admin@samsung.com', 'admin123');

      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('admin@samsung.com');
      expect(result.user.role).toBe('admin');
    });

    test('powinien zwrócić błąd przy nieprawidłowym emailu', async () => {
      await expect(
        authService.login('nieistniejacy@email.com', 'password')
      ).rejects.toThrow('Nieprawidłowy email lub hasło');
    });

    test('powinien zwrócić błąd przy nieprawidłowym haśle', async () => {
      await expect(
        authService.login('admin@samsung.com', 'wrongpassword')
      ).rejects.toThrow('Nieprawidłowy email lub hasło');
    });

    test('token JWT powinien zawierać dane użytkownika', async () => {
      const result = await authService.login('admin@samsung.com', 'admin123');
      const jwt = require('jsonwebtoken');
      
      const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
      
      expect(decoded.id).toBeDefined();
      expect(decoded.email).toBe('admin@samsung.com');
      expect(decoded.role).toBe('admin');
    });
  });

  // Test wzorca Singleton
  describe('Wzorzec Singleton', () => {
    
    test('powinien zwracać tę samą instancję AuthService', () => {
      const AuthService = require('../services/authService');
      const instance1 = AuthService;
      const instance2 = require('../services/authService');
      
      // Obie zmienne powinny wskazywać na tę samą instancję
      expect(instance1).toBe(instance2);
    });
  });
});

// Instrukcja uruchomienia testów:
// 1. Zainstaluj Jest: npm install --save-dev jest
// 2. Dodaj do package.json w sekcji "scripts": "test": "jest"
// 3. Uruchom testy: npm test
