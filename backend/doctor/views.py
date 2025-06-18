from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    PrescriptionCreateSerializer,
    TestOrderCreateSerializer,
    TestResultSerializer
)
from doctor.models import Prescription, TestOrder
from laboratory.models import TestResult
from patient.models import Patient
from django.db.models import Q
from rest_framework import status

class PatientSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('search', '')
        patients = Patient.objects.filter(
            Q(user__username__icontains=query) |
            Q(pesel__icontains=query)
        )
        data = [{"id": p.id, "username": p.user.username, "pesel": p.pesel} for p in patients]
        return Response(data)

class PrescriptionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PrescriptionCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Prescription created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestOrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TestOrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Test order created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestOrderResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        results = TestResult.objects.filter(sample__test_order__id=id)
        serializer = TestResultSerializer(results, many=True)
        return Response(serializer.data)
