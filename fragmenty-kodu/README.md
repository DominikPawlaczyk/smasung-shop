# Fragmenty Kodu - Samsung Shop

Ten folder zawiera **fragmenty kodu** ilustrujące implementację poszczególnych funkcjonalności projektu.

## 📁 Struktura Plików

### Funkcjonalności Użytkownika
- **F1-F2-Autentykacja.js** - Rejestracja i logowanie użytkownika
- **F3-F4-F5-Produkty.js** - Przeglądanie, wyszukiwanie i filtrowanie produktów
- **F6-F7-Koszyk.js** - Dodawanie do koszyka i edycja koszyka
- **F8-F9-F10-Zamowienie.js** - Wybór adresu, metody płatności i potwierdzenie zamówienia
- **F11-Historia-Zamowien.js** - Przeglądanie historii zamówień
- **F12-Zarzadzanie-Kontem.js** - Zarządzanie danymi konta i adresami

### Funkcjonalności Administratora
- **F13-F14-Admin.js** - Zarządzanie produktami i zamówieniami (admin)

### Wzorce Projektowe
- **Wzorce-Projektowe.js** - Implementacja wzorców: Singleton, Layered Architecture, Middleware, Repository, Factory

## 🎯 Mapowanie Funkcjonalności

| ID | Funkcjonalność | Plik | Priorytet |
|----|----------------|------|-----------|
| F1 | Rejestracja użytkownika | F1-F2-Autentykacja.js | Wysoki |
| F2 | Logowanie użytkownika | F1-F2-Autentykacja.js | Wysoki |
| F3 | Przeglądanie katalogu produktów | F3-F4-F5-Produkty.js | Wysoki |
| F4 | Wyszukiwanie produktów | F3-F4-F5-Produkty.js | Średni |
| F5 | Filtrowanie produktów | F3-F4-F5-Produkty.js | Średni |
| F6 | Dodawanie do koszyka | F6-F7-Koszyk.js | Wysoki |
| F7 | Edycja koszyka | F6-F7-Koszyk.js | Wysoki |
| F8 | Wybór adresu dostawy | F8-F9-F10-Zamowienie.js | Wysoki |
| F9 | Wybór metody płatności | F8-F9-F10-Zamowienie.js | Wysoki |
| F10 | Potwierdzenie zamówienia | F8-F9-F10-Zamowienie.js | Wysoki |
| F11 | Przeglądanie historii zamówień | F11-Historia-Zamowien.js | Średni |
| F12 | Zarządzanie danymi konta | F12-Zarzadzanie-Kontem.js | Średni |
| F13 | Zarządzanie produktami (admin) | F13-F14-Admin.js | Wysoki |
| F14 | Zarządzanie zamówieniami (admin) | F13-F14-Admin.js | Wysoki |

## 🏗️ Architektura Warstwowa

Każdy fragment kodu ilustruje 4 warstwy:

1. **Model (Data Layer)** - Klasy reprezentujące dane (User, Product, Order, Cart)
2. **Service (Business Logic Layer)** - Logika biznesowa aplikacji
3. **Controller (Presentation Layer)** - Obsługa requestów HTTP
4. **Routes (API Layer)** - Definicja endpointów REST API

## 🎨 Wzorce Projektowe

### Singleton
- Implementacja w `AuthService`, `ProductService`, `OrderService`
- Zapewnia jedną instancję serwisu w całej aplikacji

### Layered Architecture
- Separacja odpowiedzialności między warstwy
- Model → Service → Controller → Routes

### Middleware Pattern
- `authenticateToken` - weryfikacja JWT
- `isAdmin` - sprawdzanie uprawnień administratora

## 📝 Uwagi

- Fragmenty kodu są **uproszczone** i pokazują tylko kluczowe elementy
- Pełna implementacja znajduje się w folderach `backend/` i `frontend/`
- Kod jest zgodny z diagramami UML i wymaganiami funkcjonalnymi

## 🔗 REST API Endpoints

### Autentykacja
- `POST /api/auth/register` - F1
- `POST /api/auth/login` - F2

### Produkty
- `GET /api/products` - F3
- `GET /api/products/search?q=...` - F4
- `GET /api/products/filter?...` - F5

### Koszyk
- `POST /api/cart` - F6
- `PUT /api/cart/:productId` - F7
- `DELETE /api/cart/:productId` - F7

### Zamówienia
- `POST /api/orders` - F8, F9, F10
- `GET /api/orders/my` - F11

### Użytkownik
- `GET /api/users/profile` - F12
- `POST /api/users/addresses` - F12

### Admin
- `POST /api/products` - F13
- `GET /api/orders` - F14
- `PATCH /api/orders/:id/status` - F14
