from rest_framework import serializers
from .models import LabTest
from laboratory.models import Sample, TestResult
from patient.models import AppointmentRequest

class LabTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTest
        fields = '__all__'


class AppointmentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentRequest
        fields = ['id', 'patient', 'laboratory', 'date', 'status']

class AppointmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentRequest
        fields = ['status']

class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ['sample_id', 'patient']

class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ['test_request', 'test_name', 'result']