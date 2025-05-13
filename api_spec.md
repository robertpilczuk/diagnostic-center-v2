# Diagnostic Center API Specification (v1)

## ✨ Wprowadzenie

To jest dokument "kontraktowy" pomiędzy frontendem i backendem. Definiuje sposób komunikacji przez API REST w aplikacji Diagnostic Center. Backend bazuje na Django REST Framework (DRF) + JWT, frontend na React.

### ⚡ Uwierzytelnienie JWT

* żadania zabezpieczone wymagają nagłówka:

  ```http
  Authorization: Bearer <access_token>
  ```
* Tokeny są generowane przez endpoint `POST /api/token/`

---

## 🏠 Konto użytkownika (wszyscy)

### POST `/api/register/`

Rejestracja nowego użytkownika (pacjent / lekarz / laboratorium).

#### Request

```json
{
  "username": "jan",
  "password1": "haslo123",
  "password2": "haslo123",
  "user_type": "is_patient",
  "email": "jan@example.com",
  "pesel": "88010112345",
  "date_of_birth": "1988-01-01",
  "address": "ul. Przykładowa 1",
  "phone_number": "123456789"
}
```

* `user_type`: `is_patient` | `is_doctor` | `is_laboratory`
* `specialization`: tylko dla lekarza

#### Response

```json
{
  "message": "User created successfully"
}
```

---

### POST `/api/token/`

Logowanie i pobranie JWT

#### Request

```json
{
  "username": "jan",
  "password": "haslo123"
}
```

#### Response

```json
{
  "access": "...",
  "refresh": "..."
}
```

---

## 💼 Panel Pacjenta

### GET `/api/lab-tests/`

Lista dostępnych testów

### POST `/api/appointments/`

Rezerwacja wizyty

```json
{
  "laboratory_id": 2,
  "date": "2025-05-15T10:00:00",
  "prescription": "Morfologia + glukoza"
}
```

### GET `/api/appointments/`

Lista wizyt pacjenta

### PATCH `/api/appointments/<id>/cancel/`

Anulowanie wizyty

### PATCH `/api/appointments/<id>/reschedule/`

Nowy termin wizyty

```json
{
  "new_date": "2025-05-20T12:00:00"
}
```

### GET `/api/prescriptions/`

Lista recept pacjenta

### GET `/api/test-results/`

Wyniki badań pacjenta

---

## 👨‍⚕️ Panel Lekarza

### GET `/api/patients/?search=<query>`

Szukaj pacjenta po loginie lub peselu

### POST `/api/prescriptions/`

Wystawienie recepty

```json
{
  "patient_id": 5,
  "description": "Paracetamol 2x dziennie przez 5 dni"
}
```

### POST `/api/test-orders/`

Zlecenie badania

```json
{
  "patient_id": 5,
  "test_name": "Glukoza",
  "description": "Badanie na czczo"
}
```

### GET `/api/test-orders/<id>/results/`

Wyniki dla konkretnego zlecenia

---

## 🏫 Panel Laboratorium

### GET `/api/appointment-requests/`

Lista zgłoszeń do zaakceptowania

### PATCH `/api/appointment-requests/<id>/`

Aktualizacja statusu (accepted / rejected / pending)

```json
{
  "status": "accepted"
}
```

### POST `/api/samples/`

Rejestracja próbki

```json
{
  "sample_id": "SAMP-001",
  "patient_id": 5
}
```

### POST `/api/test-results/`

Wprowadzenie wyniku

```json
{
  "test_request_id": 10,
  "test_name": "Glukoza",
  "result": "105 mg/dL"
}
```

### GET `/api/test-results/<id>/download/`

Pobranie PDF z wynikiem

---

## 🔧 Panel Admina

### GET `/api/admin/laboratories/`

Lista laboratoriów do weryfikacji

### PATCH `/api/admin/laboratories/<id>/verify/`

Zatwierdzenie laboratorium

### GET `/api/admin/doctors/`

Lista lekarzy do weryfikacji

### PATCH `/api/admin/doctors/<id>/verify/`

Zatwierdzenie lekarza

---

## 🔎 Uwagi dla frontendu

* Endpointy `GET` są do pobierania danych do widoków i list
* Endpointy `POST` / `PATCH` do formularzy i akcji
* Pliki: `multipart/form-data` (np. `report_file`, `pdf_file`)
* Obsługa błędów:

  * `401 Unauthorized` → brak logowania
  * `403 Forbidden` → brak roli/uprawnienia
  * `422 Validation error`

---

## 🚀 Plan pracy frontend developera

* [ ] Stworzyć formularz rejestracji z dynamicznymi polami (rola)
* [ ] Zrobić logowanie (token JWT, zapis accessToken w localStorage)
* [ ] Dashboard pacjenta: lista testów, wizyty, wyniki, anulowanie, przepisanie terminu
* [ ] Dashboard lekarza: wyszukiwarka pacjenta, recepty, zlecenia
* [ ] Dashboard laboratorium: przyjmowanie zgłoszeń, wyniki, upload PDF
* [ ] Komponent do pobierania wyników (PDF)
* [ ] Obsługa ról i nawigacji (React Router + kontekst JWT)

---

## 🔨 Plan pracy backend developera

* [ ] Utworzyć modele: User, Patient, Doctor, Laboratory, TestOrder, Sample, TestRequest, TestResult, Prescription
* [ ] Zdefiniować serializery dla każdej encji (DRF Serializers)
* [ ] Zbudować widoki (ViewSets lub APIView) per rola: patient, doctor, lab
* [ ] Stworzyć routing w `urls.py` z podziałem na aplikacje
* [ ] Skonfigurować JWT (SimpleJWT) – logowanie i odświeżanie tokenów
* [ ] Obsłużyć uprawnienia (IsDoctor, IsPatient, IsLab itp.)
* [ ] Skonfigurować CORS i Swagger (drf-yasg)
* [ ] Wdrożyć upload plików PDF i raportów (FileField, MEDIA\_URL)
* [ ] Napisać testy jednostkowe (opcjonalnie) lub testować przez Swagger/Postman
