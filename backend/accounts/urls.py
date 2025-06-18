from django.urls import path
from .views import MeView  # upewnij się, że ten widok istnieje

urlpatterns = [
    path("me/", MeView.as_view(), name="me"),
]
