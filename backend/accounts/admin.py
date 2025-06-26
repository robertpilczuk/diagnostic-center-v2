from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "username",
        "email",
        "is_active",
        "is_staff",
        "is_patient",
        "is_doctor",
        "is_laboratory",
    )
    list_filter = (
        "is_patient",
        "is_doctor",
        "is_laboratory",
        "is_active",
        "is_staff",
        "is_superuser",
    )

    fieldsets = (
        *BaseUserAdmin.fieldsets,
        ("Role flags", {"fields": ("is_patient", "is_doctor", "is_laboratory")}),
    )
