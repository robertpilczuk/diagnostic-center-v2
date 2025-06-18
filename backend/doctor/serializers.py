from rest_framework import serializers
from doctor.models import Prescription, TestOrder, Doctor
from patient.models import Patient

class PrescriptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['patient', 'description']

class TestOrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestOrder
        fields = ['patient', 'test_name', 'description']

from laboratory.models import TestResult

class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = '__all__'


class DoctorAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialty', 'is_verified']