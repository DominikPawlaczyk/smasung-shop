# Samsung Shop - Sklep Internetowy

Projekt sklepu internetowego z telefonami i akcesoriami Samsung, stworzony w ramach przedmiotu Metodyki Wytwarzania Oprogramowania.

## 📋 Opis projektu

Aplikacja e-commerce umożliwiająca przeglądanie, wyszukiwanie i zakup produktów Samsung. System składa się z frontendu (React) i backendu (Node.js/Express) z REST API.

## 🏗️ Architektura

### Wzorce projektowe i architektoniczne

1. **Wzorzec architektoniczny: Architektura warstwowa (Layered Architecture)**
   - **Warstwa prezentacji** (Frontend React) - interfejs użytkownika
   - **Warstwa routingu** (Express Routes) - obsługa endpointów REST API
   - **Warstwa logiki biznesowej** (Services) - logika aplikacji
   - **Warstwa danych** (Models) - modele danych

2. **Wzorzec projektowy: Singleton**
   - Implementacja w `AuthService` - jedna instancja serwisu autentykacji w całej aplikacji
   - Zapewnia spójność zarządzania sesją użytkownika

3. **Wzorzec projektowy: Context API + Provider Pattern**
   - `AuthContext` - zarządzanie stanem użytkownika
   - `CartContext` - zarządzanie koszykiem zakupowym (Singleton pattern)

## 🚀 Funkcjonalności

### Zaimplementowane wymagania funkcjonalne:

- **F1** - Rejestracja użytkownika
- **F2** - Logowanie użytkownika
- **F3** - Przeglądanie katalogu produktów
- **F4** - Wyszukiwanie produktów
- **F5** - Filtrowanie produktów
- **F6** - Dodawanie do koszyka
- **F7** - Edycja koszyka
- **F8** - Finalizacja zamówienia
- **F9** - Panel użytkownika
- **F10** - Zarządzanie produktami (admin)
- **F11** - Zarządzanie zamówieniami (admin)

## 🛠️ Technologie

### Frontend
- React 18.2
- React Router DOM 6.20
- Axios (komunikacja z API)
- Context API (zarządzanie stanem)
- CSS3 (stylizacja)

### Backend
- Node.js
- Express.js 4.18
- JWT (autentykacja)
- bcryptjs (hashowanie haseł)
- CORS (Cross-Origin Resource Sharing)

## 📁 Struktura projektu

```
samsung-shop/
├── frontend/                 # Aplikacja React
│   ├── public/              # Pliki statyczne
│   ├── src/
│   │   ├── components/      # Komponenty React
│   │   ├── pages/           # Strony aplikacji
│   │   ├── context/         # Context API (AuthContext, CartContext)
│   │   ├── services/        # Serwisy API
│   │   └── styles/          # Style CSS
│   └── package.json
│
└── backend/                 # Serwer Node.js/Express
    ├── controllers/         # Kontrolery (warstwa kontrolera)
    ├── services/            # Logika biznesowa (warstwa serwisów)
    ├── models/              # Modele danych (warstwa danych)
    ├── routes/              # Routing REST API
    ├── middleware/          # Middleware (autentykacja)
    ├── server.js            # Główny plik serwera
    └── package.json
```

## 🔧 Instalacja i uruchomienie

### Backend

```bash
cd backend
npm install
npm start
```

Serwer uruchomi się na `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Aplikacja uruchomi się na `http://localhost:3000`

## 🔐 Dane testowe

### Konto administratora:
- Email: `admin@samsung.com`
- Hasło: `admin123`

## 📡 REST API Endpoints

### Autentykacja
- `POST /api/auth/register` - Rejestracja użytkownika
- `POST /api/auth/login` - Logowanie użytkownika

### Produkty
- `GET /api/products` - Pobieranie wszystkich produktów
- `GET /api/products/:id` - Pobieranie produktu po ID
- `GET /api/products/search?q=query` - Wyszukiwanie produktów
- `GET /api/products/filter?category=...&minPrice=...` - Filtrowanie produktów
- `POST /api/products` - Dodawanie produktu (admin)
- `PUT /api/products/:id` - Edycja produktu (admin)
- `DELETE /api/products/:id` - Usuwanie produktu (admin)

### Zamówienia
- `POST /api/orders` - Tworzenie zamówienia
- `GET /api/orders/my` - Pobieranie zamówień użytkownika
- `GET /api/orders` - Pobieranie wszystkich zamówień (admin)
- `PATCH /api/orders/:id/status` - Aktualizacja statusu zamówienia (admin)

### Użytkownicy
- `GET /api/users/profile` - Pobieranie profilu użytkownika
- `PUT /api/users/profile` - Aktualizacja profilu użytkownika

## 📝 Metodyka: Scrum

Projekt został zrealizowany zgodnie z metodyką Scrum:
- Sprinty 2-tygodniowe
- Podział na user stories odpowiadające wymaganiom funkcjonalnym
- Iteracyjny rozwój funkcjonalności

## 👥 Autorzy

- Maciej Wichowski
- Joanna Jakubowska
- Michał Guzik
- Olga Janusz
- Dominik Pawlaczyk

## 📄 Licencja

Projekt edukacyjny - Politechnika, Informatyka, Semestr IV
