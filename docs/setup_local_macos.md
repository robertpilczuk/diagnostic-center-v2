# Diagnostic Center – Uruchomienie backendu na macOS

Ten przewodnik jest przeznaczony dla programistów pracujących na **macOS**, którzy chcą uruchomić backend Django dla projektu Diagnostic Center.

## ✅ Wymagania wstępne

* Zainstalowany Python 3.12+
* Sklonowane repozytorium: `diagnostic-center-v2`
* Terminal (bash / zsh / Terminal.app)

---

## 🧭 Kroki

### 1. Przejdź do folderu `backend`

```bash
cd /ścieżka/do/diagnostic-center-v2/backend
```

---

### 2. Utwórz wirtualne środowisko

```bash
python3 -m venv venv
```

---

### 3. Aktywuj środowisko

```bash
source venv/bin/activate
```

---

### 4. Zainstaluj zależności

```bash
pip install -r requirements.txt
```

---

### 5. Utwórz plik `.env`

```bash
cp .env.example .env
```

Lub utwórz plik `.env` ręcznie, korzystając z `.env.example` jako wzoru.

---

### 6. Wykonaj migracje i uruchom serwer

```bash
python manage.py migrate
python manage.py runserver
```

Otwórz `http://localhost:8000/` w przeglądarce.

---

### 7. (Opcjonalnie) Utwórz superużytkownika

```bash
python manage.py createsuperuser
```

Przydatne do logowania się w panelu administracyjnym Django.

---

## ✅ Gotowe!

Masz lokalnie uruchomiony backend i możesz połączyć go z frontendem za pomocą API.
