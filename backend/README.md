[![Django CI](https://github.com/robertpilczuk/diagnostic-center-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/robertpilczuk/diagnostic-center-v2/actions/workflows/ci.yml)

Diagnostic Center – Backend Setup (Django + DRF)

✨ Cel

To repozytorium zawiera backend REST API dla aplikacji Diagnostic Center. Backend oparty jest o Django 5.1 + Django REST Framework + PostgreSQL + JWT + Swagger.

🔧 Wymagania

Python 3.12+

PostgreSQL (lokalnie lub Docker)

pip / venv

system:

macOS lub Linux (bash/zsh)

Windows (PowerShell / WSL / Git Bash)

🚀 Uruchomienie backendu

1. Klonowanie repozytorium

git clone https://github.com/TWOJ-LOGIN/diagnostic-center-v2.git
cd diagnostic-center-v2/backend

2. Tworzenie wirtualnego środowiska

macOS / Linux

python3 -m venv venv
source venv/bin/activate

Windows

python -m venv venv
venv\Scripts\activate

3. Instalacja zależności

pip install -r requirements.txt

4. Utwórz plik .env (lub użyj .env.example)

POSTGRES_DB=diagnostic
POSTGRES_USER=diagnostic_user
POSTGRES_PASSWORD=securepassword
POSTGRES_HOST=localhost

5. Migracje i start serwera

python manage.py migrate
python manage.py runserver

Serwer dostępny pod http://localhost:8000/

🔍 Swagger UI (testowanie API)

💻 Adres: http://localhost:8000/swagger/

Swagger pozwala:

przeglądać dokumentację API

testować endpointy bezpośrednio z poziomu przeglądarki

autoryzować się tokenem JWT

⚡ Jak to działa (opis w kodzie):

W urls.py znajdują się linijki:

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(title="Diagnostic Center API", default_version='v1'),
    public=True,
)

urlpatterns += [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

🕵️ Współpraca z frontendem

CORS (dla localhost:3000)

Upewnij się, że w settings.py masz:

INSTALLED_APPS += ["corsheaders"]
MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware"] + MIDDLEWARE
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

Token JWT

Używaj access token jako nagłówek:

Authorization: Bearer <token>

Refresh przez POST /api/token/refresh/

🌐 Deployment (opcjonalnie)

przygotuj .env

konfiguracja bazy PostgreSQL produkcyjnej

podpięcie nginx + gunicorn lub docker-compose

✏️ Autorzy

Backend lead: RP i MR

Frontend lead: RP 

Dokumentacja API: api_spec.md

