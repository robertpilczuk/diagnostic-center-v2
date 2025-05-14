from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    is_laboratory = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
