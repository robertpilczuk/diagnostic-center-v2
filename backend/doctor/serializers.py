from rest_framework import serializers
from doctor.models import Prescription, TestOrder, Doctor
from patient.models import Patient


class PrescriptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ["patient", "description"]


class TestOrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestOrder
        fields = ["patient", "test_name", "description"]


from laboratory.models import TestResult


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = "__all__"


class DoctorAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "user", "specialty", "is_verified"]


class TestOrderDetailSerializer(serializers.ModelSerializer):
    patient_username = serializers.CharField(
        source="patient.user.username", read_only=True
    )
    patient_pesel = serializers.CharField(source="patient.pesel", read_only=True)

    class Meta:
        model = TestOrder
        fields = ["id", "test_name", "ordered_at", "patient_username", "patient_pesel"]
