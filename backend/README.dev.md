# Instrukcja dla backend developera – Diagnostic Center

Ten dokument zawiera wszystko, czego potrzebujesz, aby rozpocząć pracę jako backend developer w projekcie Diagnostic Center (Django + DRF).

---

## 📁 Struktura projektu

```
diagnostic-center-v2/
├── backend/                     ← Główna aplikacja Django
│   ├── diagnostic_center/       ← Konfiguracja Django (settings, urls)
│   ├── accounts/                ← Aplikacja użytkowników (User model, auth)
│   ├── patient/                 ← Pacjenci
│   ├── doctor/                  ← Lekarze
│   ├── laboratory/              ← Laboratoria i badania
│   ├── requirements.txt         ← Lista zależności Pythona
│   └── .env.example             ← Wzór pliku konfiguracyjnego .env
├── docs/
│   ├── setup_local_windows.md   ← Instrukcja backendu (Windows)
│   └── setup_local_macos.md     ← Instrukcja backendu (macOS)
├── api_spec.md                 ← Specyfikacja API + checklisty dla devów
└── .gitignore                  ← Ignorowane pliki (venv, env, build, itp.)
```

---

## 🚀 Co zostało zrobione

✅ Konfiguracja Django: DRF, JWT, Swagger, CORS
✅ Utworzenie aplikacji: accounts, patient, doctor, laboratory
✅ Gotowa dokumentacja API (`api_spec.md`)
✅ Swagger działa: `http://localhost:8000/swagger/`
✅ Środowisko `.env` na podstawie `.env.example`

---

## 🧭 Kroki pracy backend developera

### 1. Uruchom środowisko lokalne

* Skorzystaj z instrukcji w `docs/setup_local_windows.md` lub `setup_local_macos.md`

### 2. Utwórz plik `.env`

* Skopiuj z `.env.example`
* Uzupełnij dane bazy danych, `SECRET_KEY`, itp.

### 3. Dodaj modele do aplikacji

* `accounts/models.py` → model `User`
* `patient/models.py` → `Patient`
* `doctor/models.py` → `Doctor`, `Prescription`, `TestOrder`
* `laboratory/models.py` → `Laboratory`, `LabTest`, `Sample`, `TestResult`, itd.

### 4. Zarejestruj modele w `admin.py`

* Dzięki temu będą widoczne w panelu `/admin`

### 5. Migracje i superuser

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 6. Stwórz serializery (`serializers.py`)

* Zdefiniuj pola i struktury odpowiedzi zgodnie z `api_spec.md`

### 7. Stwórz widoki i endpointy (`views.py`, `urls.py`)

* Używaj DRF (`APIView`, `ModelViewSet`, `permissions`, `IsAuthenticated`)
* Obsłuż autoryzację przez JWT

### 8. Testuj API przez Swagger (`/swagger/`) lub Postman

---

## 📘 Dokumentacja API

Zobacz plik `api_spec.md`. Znajdziesz tam:

* Dokładne endpointy REST API
* Przykładowe requesty i odpowiedzi (JSON)
* Checklistę zadań backend/frontend

---

## ✅ Gotowe do pracy

Możesz rozpocząć implementację od razu. Masz gotowe środowisko, strukturę i plan działania.

### 🔐 Kodowanie plików

Aby uniknąć błędów z kodowaniem (np. `UnicodeDecodeError` w Django), upewnij się że:

- Wszystkie pliki zapisane są jako UTF-8 (without BOM)
- Edytujesz pliki tylko w VS Code lub innym edytorze wspierającym `.editorconfig`
- Masz ustawione w VS Code (CTRL + Shift + P wpisz Preferences: Open Settings (JSON)):
  ```json
  "files.encoding": "utf8",
  "files.autoGuessEncoding": false
