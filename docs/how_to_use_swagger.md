# Jak korzystać ze Swaggera – Diagnostic Center

Ten dokument pokazuje, jak korzystać z dokumentacji API projektu Diagnostic Center przy pomocy Swagger UI.

---

## 📌 Czym jest Swagger?

Swagger to graficzna dokumentacja REST API dostępna w przeglądarce. Pozwala:

* przeglądać dostępne endpointy
* uruchamiać zapytania (GET, POST, itd.)
* testować API bez pisania kodu
* autoryzować się przez JWT

---

## 🌐 Jak otworzyć Swagger?

Swagger działa lokalnie pod adresem:

```
http://localhost:8000/swagger/
```

Dostępny jest po uruchomieniu backendu Django:

```bash
python manage.py runserver
```

---

## 🧪 Jak uzyskać token JWT?

1. Na stronie Swaggera znajdź:

   ```
   ```

POST /api/token/

````

2. Kliknij **Try it out** (przycisk po prawej)

3. Wypełnij formularz:
   ```json
   {
     "username": "twojanazwa",
     "password": "twojehaslo"
   }
````

4. Kliknij **Execute**

5. W odpowiedzi pojawi się:

   ```json
   {
     "access": "eyJ...",
     "refresh": "eyJ..."
   }
   ```

6. Skopiuj wartość z pola `access`

---

## 🔐 Jak zalogować się do Swaggera (token JWT)?

1. Kliknij przycisk **Authorize** w prawym górnym rogu (ikona 🔐)

2. W polu wpisz:

   ```
   ```

Bearer TWÓJ\_TOKEN

```
   np.:
```

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```

3. Kliknij **Authorize → Close**

Swagger teraz automatycznie będzie dodawał Twój token do każdego zapytania.

---

## ✅ Co można testować?

- `GET /me/` → dane zalogowanego użytkownika (jeśli taki endpoint istnieje)
- `GET`, `POST`, `PUT`, `DELETE` do zasobów (np. pacjenci, lekarze, testy)
- `POST /api/token/refresh/` – odświeżenie tokena

---

## 🧩 Uwagi

- Jeśli zobaczysz `401 Unauthorized`, upewnij się, że token jest poprawny i wpisany z przedrostkiem `Bearer`
- Jeśli Swagger się nie ładuje: upewnij się, że masz `DEBUG = True` i poprawnie skonfigurowany `SWAGGER_SETTINGS` w `settings.py`
- Endpointy muszą być faktycznie zaimplementowane (jeśli klikniesz i nic się nie dzieje – to dopiero do zrobienia przez backend deva)

---

## 📂 Gdzie znajduje się Swagger?
Plik konfiguracji Swaggera znajduje się w:
- `diagnostic_center/urls.py` – endpoint `/swagger/`
- `settings.py` – sekcja `SWAGGER_SETTINGS`

---

## 📘 Dla kogo jest Swagger?

| Rola        | Użycie Swaggera                    |
|-------------|-------------------------------------|
| Backend     | Testowanie endpointów i JWT        |
| Frontend    | Przeglądanie struktury danych      |
| Testerzy    | Walidacja zachowania API           |
| DevOps      | Sprawdzenie dostępności dokumentacji |

---

Swagger = dokumentacja + tester + symulator API ✨

```
