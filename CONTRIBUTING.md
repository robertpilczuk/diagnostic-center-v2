 🤝 CONTRIBUTING.md – Zasady współpracy w projekcie Diagnostic Center

Witaj w projekcie Diagnostic Center!  
Ten dokument zawiera wytyczne dotyczące pracy zespołowej, commitów, Pull Requestów i procesu developmentu.

---

## 📁 Struktura repozytorium

diagnostic-center-v2/
├── backend/ ← Django + DRF (API + JWT)
├── frontend/ ← React (UI, routing, AuthContext)
├── .github/workflows/ ← CI/CD (GitHub Actions)
├── README.md ← instrukcja główna
├── api_spec.md ← specyfikacja API dla front-back

markdown
Copy
Edit

---

## 🛠️ Workflow Git + GitHub

### 🔀 1. Tworzenie gałęzi (branch)

**Nigdy nie commitujemy bezpośrednio na `main`!**

Przykłady nazw gałęzi:
- `feat/auth-login-form`
- `fix/api-token-refresh`
- `chore/update-docs`

### ✏️ 2. Commity – używamy Conventional Commits:

| Prefix     | Kiedy używać                       |
|------------|------------------------------------|
| `feat:`    | Nowa funkcjonalność                |
| `fix:`     | Poprawka błędu                     |
| `docs:`    | Zmiana dokumentacji `.md`          |
| `style:`   | Formatowanie, brak zmian w kodzie  |
| `refactor:`| Zmiany w kodzie bez zmiany logiki  |
| `test:`    | Dodanie lub poprawka testów        |
| `chore:`   | Inne zadania pomocnicze            |

**Przykłady commitów:**
feat: implement /me/ endpoint in accounts API
fix: correct token authorization in Swagger UI
docs: update README with frontend setup

yaml
Copy
Edit

---

## 🚀 Pull Request – co musi zawierać?

1. Nazwę nawiązującą do tasku (np. `feat: create patient dashboard`)
2. Opis zmian + instrukcję testowania
3. Link do powiązanego commita/issue (jeśli istnieje)

### ✅ Checklista przed PR:
- [ ] Kod działa lokalnie (np. `runserver`, `npm start`)
- [ ] Zmiany są zgodne z `api_spec.md`
- [ ] Nazwy commitów zgodne z konwencją
- [ ] Nie ma niepotrzebnych plików (np. `node_modules`, `__pycache__`)
- [ ] Plik `.env` NIE jest commitowany

---

## 🔍 Code Review

- Każdy PR musi zostać zatwierdzony (`approve`) przed scaleniem z `main`
- Można zostawić komentarze lub poprosić o poprawki
- Dbanie o czytelność i zgodność z ustaleniami to wspólna odpowiedzialność

---

## 📚 Dokumentacja

- Swagger: `/swagger/`
- Specyfikacja API: `api_spec.md`
- Obsługa JWT: `how_to_use_swagger.md`
- Backend setup: `README.md`
- Frontend setup: `frontend/README.md`

---

Dziękujemy za Twój wkład! 💙
