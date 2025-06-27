from rest_framework import serializers
from doctor.models import Prescription
from laboratory.models import TestResult
from patient.models import Patient


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = "__all__"


class PatientListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")

    class Meta:
        model = Patient
        fields = [
            "id",
            "username",
            "email",
            "pesel",
            "date_of_birth",
        ]
