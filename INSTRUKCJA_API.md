# Instrukcja API - Samsung Shop

## Autoryzacja

Większość endpointów wymaga tokenu JWT w nagłówku:
```
Authorization: Bearer <token>
```

## Endpointy

### Autentykacja (F1, F2)

#### Rejestracja
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "haslo123",
  "firstName": "Jan",
  "lastName": "Kowalski"
}
```

#### Logowanie
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "haslo123"
}
```

### Produkty (F3, F4, F5, F13)

#### Przeglądanie wszystkich produktów
```http
GET /api/products
```

#### Wyszukiwanie produktów
```http
GET /api/products/search?q=galaxy
```

#### Filtrowanie produktów
```http
GET /api/products/filter?category=smartphone&minPrice=1000&maxPrice=5000&inStock=true
```

#### Szczegóły produktu
```http
GET /api/products/:id
```

#### Dodanie produktu (admin)
```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Samsung Galaxy S24",
  "model": "S24",
  "category": "smartphone",
  "price": 3999,
  "description": "Opis produktu",
  "specs": {
    "screen": "6.2\"",
    "ram": "8GB"
  },
  "image": "/images/s24.jpg",
  "stock": 50
}
```

#### Edycja produktu (admin)
```http
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 3499,
  "stock": 30
}
```

#### Usunięcie produktu (admin)
```http
DELETE /api/products/:id
Authorization: Bearer <admin_token>
```

### Koszyk (F6, F7)

#### Pobieranie koszyka
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Dodanie do koszyka
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

#### Zmiana ilości w koszyku
```http
PUT /api/cart/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Usunięcie z koszyka
```http
DELETE /api/cart/:productId
Authorization: Bearer <token>
```

#### Wyczyszczenie koszyka
```http
DELETE /api/cart
Authorization: Bearer <token>
```

### Zamówienia (F10, F11, F14)

#### Złożenie zamówienia
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "ul. Testowa 1",
    "city": "Warszawa",
    "postalCode": "00-001",
    "country": "Polska"
  },
  "shippingMethod": "courier",
  "paymentMethod": "card"
}
```

#### Historia zamówień użytkownika
```http
GET /api/orders/my
Authorization: Bearer <token>
```

#### Szczegóły zamówienia
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Wszystkie zamówienia (admin)
```http
GET /api/orders
Authorization: Bearer <admin_token>
```

#### Zmiana statusu zamówienia (admin)
```http
PATCH /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped"
}
```
Dostępne statusy: `pending`, `paid`, `shipped`, `delivered`, `cancelled`

### Użytkownik (F8, F12)

#### Pobieranie profilu
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Aktualizacja profilu
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jan",
  "lastName": "Nowak"
}
```

#### Lista adresów
```http
GET /api/users/addresses
Authorization: Bearer <token>
```

#### Dodanie adresu
```http
POST /api/users/addresses
Authorization: Bearer <token>
Content-Type: application/json

{
  "street": "ul. Nowa 5",
  "city": "Kraków",
  "postalCode": "30-001",
  "country": "Polska"
}
```

#### Edycja adresu
```http
PUT /api/users/addresses/:addressId
Authorization: Bearer <token>
Content-Type: application/json

{
  "street": "ul. Zmieniona 10"
}
```

#### Usunięcie adresu
```http
DELETE /api/users/addresses/:addressId
Authorization: Bearer <token>
```

## Testowanie

### Konto administratora (domyślne)
```
Email: admin@samsung.com
Hasło: admin123
```

### Przykładowy przepływ zakupowy

1. Rejestracja/Logowanie
2. Przeglądanie produktów: `GET /api/products`
3. Dodanie do koszyka: `POST /api/cart`
4. Sprawdzenie koszyka: `GET /api/cart`
5. Dodanie adresu: `POST /api/users/addresses`
6. Złożenie zamówienia: `POST /api/orders`
7. Historia zamówień: `GET /api/orders/my`
