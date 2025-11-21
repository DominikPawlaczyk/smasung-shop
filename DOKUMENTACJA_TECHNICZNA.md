# Dokumentacja Techniczna - Samsung Shop

## 1. Architektura systemu

### 1.1. Wzorzec architektoniczny: Architektura warstwowa

System został zbudowany w oparciu o architekturę warstwową, która dzieli aplikację na logiczne warstwy:

```
┌─────────────────────────────────────┐
│   Warstwa Prezentacji (Frontend)   │  <- React Components, Pages
├─────────────────────────────────────┤
│   Warstwa Routingu (API Layer)     │  <- Express Routes
├─────────────────────────────────────┤
│   Warstwa Logiki (Business Logic)  │  <- Services
├─────────────────────────────────────┤
│   Warstwa Danych (Data Layer)      │  <- Models, Mock Database
└─────────────────────────────────────┘
```

**Zalety tego podejścia:**
- Separacja odpowiedzialności (Separation of Concerns)
- Łatwość testowania poszczególnych warstw
- Możliwość niezależnej modyfikacji każdej warstwy
- Skalowalność systemu

### 1.2. Komunikacja między warstwami

Frontend komunikuje się z backendem poprzez REST API:
- Protokół: HTTP/HTTPS
- Format danych: JSON
- Autentykacja: JWT (JSON Web Tokens)

## 2. Wzorce projektowe

### 2.1. Singleton Pattern

**Lokalizacja:** `backend/services/authService.js`

**Implementacja:**
```javascript
class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Zwraca istniejącą instancję
    }
    AuthService.instance = this;
  }
  // ... metody
}

module.exports = new AuthService(); // Eksport jednej instancji
```

**Zastosowanie:**
- Zapewnia, że w całej aplikacji istnieje tylko jedna instancja AuthService
- Gwarantuje spójność zarządzania sesją użytkownika
- Oszczędza pamięć - jedna instancja zamiast wielu

**Dlaczego Singleton?**
- Serwis autentykacji nie powinien mieć wielu instancji
- Wszystkie części aplikacji powinny korzystać z tego samego stanu autentykacji

### 2.2. Context API + Provider Pattern

**Lokalizacja:** `frontend/src/context/AuthContext.js`, `frontend/src/context/CartContext.js`

**Implementacja:**
```javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // ... logika
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Zastosowanie:**
- Zarządzanie stanem globalnym w aplikacji React
- Unikanie "prop drilling" (przekazywania props przez wiele poziomów)
- Centralizacja logiki biznesowej

**Komponenty wykorzystujące Context:**
- `AuthContext` - stan użytkownika, logowanie, wylogowanie
- `CartContext` - koszyk zakupowy, dodawanie/usuwanie produktów

## 3. Backend - Szczegóły implementacji

### 3.1. Struktura warstw

#### Warstwa Routingu (Routes)
**Plik:** `routes/productRoutes.js`

```javascript
// Definicja endpointów REST API
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.post('/', authenticateToken, isAdmin, productController.addProduct);
```

**Odpowiedzialność:**
- Definicja endpointów HTTP
- Mapowanie URL na funkcje kontrolera
- Zastosowanie middleware (autentykacja, autoryzacja)

#### Warstwa Kontrolera (Controllers)
**Plik:** `controllers/productController.js`

```javascript
class ProductController {
  getAllProducts(req, res) {
    try {
      const products = productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

**Odpowiedzialność:**
- Obsługa requestów HTTP
- Walidacja danych wejściowych
- Wywołanie odpowiednich metod serwisów
- Formatowanie odpowiedzi HTTP

#### Warstwa Serwisów (Services)
**Plik:** `services/productService.js`

```javascript
class ProductService {
  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.model.toLowerCase().includes(searchTerm)
    );
  }
}
```

**Odpowiedzialność:**
- Logika biznesowa aplikacji
- Operacje na danych
- Walidacja reguł biznesowych

#### Warstwa Danych (Models)
**Plik:** `models/Product.js`

```javascript
class Product {
  constructor(id, name, model, category, price, ...) {
    this.id = id;
    this.name = name;
    // ... inicjalizacja pól
    this.sku = `SAM-${category.substring(0, 3).toUpperCase()}-${id}`;
  }
}
```

**Odpowiedzialność:**
- Definicja struktury danych
- Mockowa baza danych (w pamięci)
- W produkcji: integracja z bazą danych (MySQL/MongoDB)

### 3.2. Middleware

**Plik:** `middleware/auth.js`

```javascript
const authenticateToken = (req, res, next) => {
  const token = authHeader && authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Nieprawidłowy token' });
    req.user = user;
    next();
  });
};
```

**Funkcje middleware:**
- `authenticateToken` - weryfikacja tokenu JWT
- `isAdmin` - sprawdzenie uprawnień administratora

## 4. Frontend - Szczegóły implementacji

### 4.1. Struktura komponentów

#### Komponenty prezentacyjne
- `ProductCard` - karta produktu w katalogu
- `Navbar` - nawigacja
- `ProtectedRoute` - ochrona ścieżek przed nieautoryzowanym dostępem

#### Strony (Pages)
- `HomePage` - strona główna
- `ProductsPage` - katalog z wyszukiwaniem i filtrowaniem
- `CartPage` - koszyk zakupowy
- `CheckoutPage` - finalizacja zamówienia
- `LoginPage` / `RegisterPage` - autentykacja
- `UserDashboard` - panel użytkownika
- `AdminDashboard` - panel administracyjny

### 4.2. Zarządzanie stanem

#### AuthContext
```javascript
const value = {
  user,           // Dane zalogowanego użytkownika
  token,          // Token JWT
  login,          // Funkcja logowania
  logout,         // Funkcja wylogowania
  isAdmin,        // Sprawdzenie czy użytkownik jest adminem
  isAuthenticated // Czy użytkownik jest zalogowany
};
```

#### CartContext (Singleton Pattern)
```javascript
const value = {
  cartItems,      // Produkty w koszyku
  addToCart,      // Dodawanie produktu
  removeFromCart, // Usuwanie produktu
  updateQuantity, // Zmiana ilości
  clearCart,      // Czyszczenie koszyka
  getTotalPrice,  // Obliczanie sumy
  getCartCount    // Liczba produktów
};
```

### 4.3. Komunikacja z API

**Plik:** `services/api.js`

```javascript
// Centralizacja wywołań API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Interceptor dodający token do każdego requesta
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 5. Przepływ danych - Przykłady

### 5.1. Proces logowania (F2)

```
1. Użytkownik → LoginPage (wprowadza dane)
2. LoginPage → api.login() (wywołanie API)
3. Frontend → POST /api/auth/login (request HTTP)
4. Backend Router → authController.login()
5. Controller → authService.login() (weryfikacja)
6. Service → sprawdzenie w models/User
7. Service → generowanie tokenu JWT
8. Backend → Response z tokenem i danymi użytkownika
9. Frontend → AuthContext.login() (zapisanie stanu)
10. Frontend → localStorage (zapisanie tokenu)
11. Frontend → Przekierowanie do strony głównej
```

### 5.2. Dodawanie do koszyka (F6)

```
1. Użytkownik → ProductCard (klik "Dodaj do koszyka")
2. ProductCard → CartContext.addToCart(product)
3. CartContext → aktualizacja stanu cartItems
4. CartContext → localStorage (zapis koszyka)
5. Navbar → CartContext.getCartCount() (aktualizacja licznika)
```

### 5.3. Składanie zamówienia (F8)

```
1. Użytkownik → CheckoutPage (wybór dostawy i płatności)
2. CheckoutPage → api.createOrder() (wysłanie zamówienia)
3. Frontend → POST /api/orders (request z tokenem JWT)
4. Backend → authenticateToken middleware (weryfikacja)
5. Router → orderController.createOrder()
6. Controller → orderService.createOrder()
7. Service → walidacja produktów i stanów magazynowych
8. Service → utworzenie zamówienia w models/Order
9. Service → aktualizacja stanów magazynowych
10. Backend → Response z danymi zamówienia
11. Frontend → CartContext.clearCart() (wyczyszczenie koszyka)
12. Frontend → Przekierowanie do UserDashboard
```

## 6. Bezpieczeństwo

### 6.1. Autentykacja JWT

```javascript
// Generowanie tokenu
const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

**Zabezpieczenia:**
- Token wygasa po 24 godzinach
- Token zawiera tylko niezbędne dane (id, email, role)
- Secret key przechowywany w zmiennych środowiskowych

### 6.2. Hashowanie haseł

W produkcji:
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

W mockowej wersji:
```javascript
password: `hashed_${password}` // Symulacja hashowania
```

### 6.3. CORS

```javascript
app.use(cors()); // Umożliwia komunikację frontend-backend
```

## 7. Testowanie

### 7.1. Testy jednostkowe (przykład)

**Plik:** `backend/tests/authService.test.js`

```javascript
describe('AuthService', () => {
  test('powinien zarejestrować nowego użytkownika', async () => {
    const result = await authService.register(
      'test@example.com',
      'password123',
      'Jan',
      'Kowalski'
    );
    
    expect(result.user.email).toBe('test@example.com');
    expect(result.token).toBeDefined();
  });
});
```

### 7.2. Testy integracyjne

Testowanie endpointów API z użyciem narzędzi takich jak Postman lub curl.

## 8. Możliwe rozszerzenia

### 8.1. Integracja z bazą danych

Zamiana mockowych danych na prawdziwą bazę:
- MySQL z Sequelize ORM
- MongoDB z Mongoose

### 8.2. Dodatkowe funkcjonalności

- System recenzji produktów
- Porównywarka produktów
- Wishlist (lista życzeń)
- Newsletter
- Integracja z prawdziwymi bramkami płatności

### 8.3. Deployment

- Frontend: Vercel / Netlify
- Backend: Heroku / Render / DigitalOcean
- Docker Compose dla łatwego wdrożenia

## 9. Podsumowanie

Projekt demonstruje:
- ✅ Architekturę warstwową (Layered Architecture)
- ✅ Wzorzec Singleton (AuthService)
- ✅ Wzorzec Provider (Context API)
- ✅ REST API z pełną separacją frontend-backend
- ✅ Wszystkie wymagane funkcjonalności (F1-F11)
- ✅ Komentarze w kodzie dla celów edukacyjnych
- ✅ Dokumentację techniczną

System jest gotowy do prezentacji i dalszego rozwoju.
