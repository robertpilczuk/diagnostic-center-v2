# 🖥️ Diagnostic Center – Frontend (React + Vite + TypeScript)

Ten projekt zawiera frontend aplikacji Diagnostic Center, stworzony w React + TypeScript z użyciem Vite. Pozwala użytkownikom na interakcję z systemem: rejestrację, logowanie, przeglądanie badań, wizyt, recept i wyników.

---

## 📁 Struktura katalogów

```
frontend/
├── public/
├── src/
│   ├── api/            # integracja z backendem (np. apiClient.ts)
│   ├── components/     # komponenty wspólne (np. Navbar, Loader)
│   ├── contexts/       # AuthContext – przechowywanie tokenów JWT
│   ├── pages/          # widoki stron (np. LoginPage, Dashboard)
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── README.md
```

---

## 🚀 Jak uruchomić projekt lokalnie

### 1. Wejdź do folderu `frontend/`

```bash
cd frontend
```

### 2. Zainstaluj zależności

```bash
npm install
```

### 3. Stwórz plik `.env`

Utwórz plik `.env` i dodaj adres backendu:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

> ✅ W Vite wszystkie zmienne środowiskowe muszą mieć prefix `VITE_`.

### 4. Uruchom aplikację

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

---

## 🔐 Autoryzacja JWT

* Po zalogowaniu otrzymujemy token JWT z backendu.
* Token jest zapisywany w `localStorage` i automatycznie dołączany do zapytań HTTP.
* Wylogowanie usuwa token z pamięci.

---

## 📦 Wymagania

* Node.js 18+
* npm
* Backend Django (domyślnie dostępny pod `http://localhost:8000`)

---

## 📚 Dokumentacja API

Dostępna pod adresem:

```
http://localhost:8000/swagger/
```

Zawiera pełną specyfikację endpointów REST API (generowaną automatycznie).

---

## 🧪 Testowanie

Na ten moment testy frontendowe nie są zaimplementowane.

---

## 🔗 Przydatne komendy

| Komenda            | Opis                           |
|--------------------|--------------------------------|
| `npm run dev`      | uruchomienie aplikacji (dev)   |
| `npm run build`    | build produkcyjny              |
| `npm run preview`  | podgląd buildu lokalnie        |

---

## 🤝 Współpraca

* Pracuj na `feature/*` branchach.
* Twórz Pull Requesty z opisem zmian.
* Merge po akceptacji i review (branch protection włączony).

---

## 🧩 Stack technologiczny

- React 18 + TypeScript
- Vite
- Axios
- React Router DOM
- JWT Auth

---

## 🧠 Uwagi

W projekcie korzystamy z tokenów JWT generowanych przez backend Django. Token jest przekazywany jako nagłówek `Authorization: Bearer <token>` przy każdym żądaniu API.
