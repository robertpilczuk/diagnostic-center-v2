﻿from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass  # Możesz dodać więcej opcji jak pola do wyświetlania itp.
