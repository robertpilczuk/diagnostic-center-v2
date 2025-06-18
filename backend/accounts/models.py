from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    is_laboratory = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",
        blank=True,
        verbose_name="groups", 
        help_text="The groups this user belongs to.",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_set",
        blank=True,
        verbose_name="user permissions",
        help_text="Specific permissions for this user.",
    )

    def __str__(self):
        return self.username
