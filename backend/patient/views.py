from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    PrescriptionSerializer,
    TestResultSerializer,
    PatientTestResultSerializer,
)
from laboratory.models import TestResult
from doctor.models import Prescription


class PatientTestListView(ListAPIView):
    serializer_class = PatientTestResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TestResult.objects.filter(
            sample__test_order__patient=self.request.user.patient
        )


class PatientTestDetailView(RetrieveAPIView):
    serializer_class = PatientTestResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TestResult.objects.filter(
            sample__test_order__patient=self.request.user.patient
        )


class PrescriptionListView(ListAPIView):
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Prescription.objects.filter(patient=self.request.user.patient)


class TestResultListView(ListAPIView):
    serializer_class = TestResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TestResult.objects.filter(
            sample__test_order__patient=self.request.user.patient
        )
