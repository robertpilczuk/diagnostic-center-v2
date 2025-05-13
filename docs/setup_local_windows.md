# Diagnostic Center – Uruchomienie backendu na Windows

Ten przewodnik jest przeznaczony dla programistów pracujących na **Windows**, którzy chcą uruchomić backend Django dla projektu Diagnostic Center.

## ✅ Wymagania wstępne

* Zainstalowany Python 3.12+
* Sklonowane repozytorium: `diagnostic-center-v2`
* Terminal: PowerShell, CMD lub Git Bash

---

## 🧭 Kroki

### 1. Przejdź do folderu `backend`

```powershell
cd ścieżka\do\diagnostic-center-v2\backend
```

---

### 2. Utwórz wirtualne środowisko

```powershell
python -m venv venv
```

---

### 3. Aktywuj środowisko

```powershell
venv\Scripts\activate
```

Jeśli pojawi się ostrzeżenie bezpieczeństwa, zezwól na uruchamianie skryptów:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Następnie ponownie aktywuj środowisko.

---

### 4. Zainstaluj zależności

```powershell
pip install -r requirements.txt
```

---

### 5. Utwórz plik `.env`

```powershell
copy .env.example .env
```

Lub stwórz plik `.env` ręcznie, używając `.env.example` jako wzoru.

---

### 6. Wykonaj migracje i uruchom serwer

```powershell
python manage.py migrate
python manage.py runserver
```

Otwórz `http://localhost:8000/` w przeglądarce.

---

### 7. (Opcjonalnie) Utwórz superużytkownika

```powershell
python manage.py createsuperuser
```

Przydatne do logowania się w panelu administracyjnym Django.

---

## ✅ Gotowe!

Masz lokalnie uruchomiony backend i możesz połączyć go z frontendem za pomocą API.
