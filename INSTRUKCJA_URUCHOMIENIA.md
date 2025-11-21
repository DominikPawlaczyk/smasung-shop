# Instrukcja uruchomienia projektu Samsung Shop

## Wymagania wstępne

Przed uruchomieniem projektu upewnij się, że masz zainstalowane:
- **Node.js** (wersja 16 lub nowsza) - [Pobierz tutaj](https://nodejs.org/)
- **npm** (instaluje się automatycznie z Node.js)

Sprawdź wersje:
```bash
node --version
npm --version
```

## Krok 1: Pobranie projektu

Sklonuj repozytorium lub rozpakuj archiwum projektu:
```bash
cd samsung-shop
```

## Krok 2: Instalacja backendu

Otwórz terminal i przejdź do folderu backend:

```bash
cd backend
npm install
```

To polecenie zainstaluje wszystkie wymagane zależności:
- express
- cors
- bcryptjs
- jsonwebtoken
- dotenv

## Krok 3: Uruchomienie backendu

W folderze `backend` uruchom serwer:

```bash
npm start
```

Powinieneś zobaczyć komunikat:
```
Serwer działa na porcie 5000
```

**Ważne:** Pozostaw ten terminal otwarty - serwer musi działać cały czas!

## Krok 4: Instalacja frontendu

Otwórz **nowy terminal** (nie zamykaj poprzedniego!) i przejdź do folderu frontend:

```bash
cd frontend
npm install
```

To polecenie zainstaluje wszystkie wymagane zależności:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

**Uwaga:** Instalacja może potrwać kilka minut.

## Krok 5: Uruchomienie frontendu

W folderze `frontend` uruchom aplikację:

```bash
npm start
```

Aplikacja automatycznie otworzy się w przeglądarce pod adresem:
```
http://localhost:3000
```

## Krok 6: Testowanie aplikacji

### Logowanie jako administrator

1. Przejdź do strony logowania
2. Użyj danych testowych:
   - **Email:** admin@samsung.com
   - **Hasło:** admin123

### Rejestracja nowego użytkownika

1. Kliknij "Rejestracja"
2. Wypełnij formularz
3. Po rejestracji zostaniesz automatycznie zalogowany

### Testowanie funkcjonalności

- **Przeglądanie produktów:** Kliknij "Produkty" w menu
- **Wyszukiwanie:** Użyj paska wyszukiwania na stronie produktów
- **Filtrowanie:** Użyj filtrów (kategoria, cena, dostępność)
- **Dodawanie do koszyka:** Kliknij "Dodaj do koszyka" na karcie produktu
- **Koszyk:** Kliknij "Koszyk" w menu, edytuj ilości
- **Zamówienie:** Przejdź do kasy, wybierz dostawę i płatność
- **Panel użytkownika:** Kliknij "Moje konto" aby zobaczyć zamówienia
- **Panel admina:** (tylko dla admina) Kliknij "Panel Admin"

## Rozwiązywanie problemów

### Problem: "Port 3000 is already in use"

Jeśli port 3000 jest zajęty, możesz:
1. Zamknąć aplikację używającą portu 3000
2. Lub użyć innego portu (aplikacja zapyta czy chcesz użyć innego portu)

### Problem: "Port 5000 is already in use"

Zmień port w pliku `backend/.env`:
```
PORT=5001
```

I zaktualizuj URL w `frontend/src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### Problem: Błąd CORS

Upewnij się, że:
1. Backend działa na porcie 5000
2. Frontend działa na porcie 3000
3. W pliku `backend/server.js` jest `app.use(cors())`

### Problem: "Cannot find module"

Usuń folder `node_modules` i zainstaluj ponownie:
```bash
rm -rf node_modules
npm install
```

## Zatrzymanie aplikacji

Aby zatrzymać aplikację:
1. W terminalu z backendem naciśnij `Ctrl + C`
2. W terminalu z frontendem naciśnij `Ctrl + C`

## Struktura portów

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Endpoint:** http://localhost:5000/api

## Następne kroki

Po uruchomieniu możesz:
1. Przetestować wszystkie funkcjonalności (F1-F11)
2. Przejrzeć kod źródłowy z komentarzami
3. Przeczytać dokumentację techniczną w pliku `DOKUMENTACJA_TECHNICZNA.md`
4. Dodać projekt do repozytorium Git

## Dodawanie do Git

```bash
git init
git add .
git commit -m "Initial commit - Samsung Shop"
git remote add origin <URL_TWOJEGO_REPO>
git push -u origin main
```

## Wsparcie

W razie problemów sprawdź:
- Czy Node.js jest zainstalowany poprawnie
- Czy oba terminale (backend i frontend) są otwarte
- Czy nie ma błędów w konsoli przeglądarki (F12)
- Czy nie ma błędów w terminalach

Powodzenia! 🚀
