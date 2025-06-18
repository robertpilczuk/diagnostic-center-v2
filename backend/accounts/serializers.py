from rest_framework import serializers
from accounts.models import User


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "is_patient", "is_doctor", "is_laboratory")
