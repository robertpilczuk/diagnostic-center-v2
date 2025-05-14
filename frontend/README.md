# 🖥️ Diagnostic Center – Frontend (React)

Ten projekt zawiera frontend aplikacji Diagnostic Center, stworzony w React. Pozwala użytkownikom na interakcję z systemem: rejestrację, logowanie, przeglądanie badań, wizyt, recept i wyników.

---

## 📁 Struktura katalogów

```
frontend/
├── public/
├── src/
│   ├── api/            # integracja z backendem (np. apiClient.js)
│   ├── components/     # komponenty wspólne (np. Navbar, Loader)
│   ├── context/        # AuthContext – przechowywanie tokenów JWT
│   ├── pages/          # widoki stron (np. LoginPage, HomePage)
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Jak uruchomić projekt lokalnie

### 1. Wejdź do folderu `frontend/`

```
cd frontend
```

### 2. Zainstaluj zależności

```
npm install
```

### 3. Stwórz plik `.env`

Utwórz plik `.env` i dodaj adres backendu:

```
REACT_APP_API_URL=http://localhost:8000
```

> ✅ UWAGA: Prefix `REACT_APP_` jest obowiązkowy w Create React App.

### 4. Uruchom aplikację

```
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

---

## 🔐 Autoryzacja JWT

* Po zalogowaniu otrzymujemy token JWT.
* Token jest zapisywany w `localStorage` i dodawany automatycznie w nagłówkach zapytań.
* Wylogowanie usuwa token z pamięci.

---

## 📦 Wymagania

* Node.js 18+
* npm
* połączenie z backendem (domyślnie `http://localhost:8000`)

---

## 📚 Dokumentacja API

Dostępna pod adresem:

```
http://localhost:8000/swagger/
```

Zawiera pełną specyfikację endpointów REST API.

---

## 🧪 Testowanie

Na ten moment testy nie są zaimplementowane.

---

## 🔗 Przydatne komendy

* `npm run start` – uruchomienie aplikacji
* `npm run build` – produkcyjny build aplikacji

---

## 🤝 Współpraca

* Korzystaj z feature branches.
* Twórz Pull Requesty z opisem zmian.
* Review i merge tylko po akceptacji (branch protection).
