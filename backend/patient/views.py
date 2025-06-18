from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import PrescriptionSerializer, TestResultSerializer
from doctor.models import Prescription
from laboratory.models import TestResult

class PrescriptionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prescriptions = Prescription.objects.filter(patient__user=request.user)
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)

class TestResultListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        results = TestResult.objects.filter(sample__test_order__patient__user=request.user)
        serializer = TestResultSerializer(results, many=True)
        return Response(serializer.data)
