from django.urls import path
from .views import MeView, RegisterView, AdminCreateUserView

urlpatterns = [
    path("me/", MeView.as_view(), name="me"),
    path("register/", RegisterView.as_view(), name="register"),
    path("admin/create-user/", AdminCreateUserView.as_view(), name="admin-create-user"),
]
