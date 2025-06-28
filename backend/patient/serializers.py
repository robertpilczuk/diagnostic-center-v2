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


class PatientTestResultSerializer(serializers.ModelSerializer):
    test_name = serializers.CharField(source="sample.test_order.test_name")
    ordered_at = serializers.DateTimeField(source="sample.test_order.ordered_at")
    doctor_name = serializers.CharField(source="sample.test_order.doctor.user.username")
    result_pdf_url = serializers.FileField(source="pdf", read_only=True)

    class Meta:
        model = TestResult
        fields = ["id", "test_name", "ordered_at", "doctor_name", "result_pdf_url"]
