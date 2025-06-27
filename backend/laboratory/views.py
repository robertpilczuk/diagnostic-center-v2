from rest_framework.generics import ListAPIView
from .models import LabTest, Laboratory
from .serializers import LabTestSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from laboratory.models import Sample, TestResult
from patient.models import AppointmentRequest, Patient
from .serializers import (
    AppointmentRequestSerializer,
    AppointmentStatusUpdateSerializer,
    SampleSerializer,
    TestResultSerializer,
)
from .serializers import LaboratoryAdminSerializer
from rest_framework.permissions import IsAdminUser
from doctor.models import TestOrder
from doctor.serializers import TestOrderDetailSerializer
from laboratory.models import Sample
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class LabTestListView(ListAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer


class AppointmentRequestListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        appointments = AppointmentRequest.objects.filter(laboratory__user=request.user)
        serializer = AppointmentRequestSerializer(appointments, many=True)
        return Response(serializer.data)


class AppointmentRequestUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            appointment = AppointmentRequest.objects.get(id=id)
        except AppointmentRequest.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = AppointmentStatusUpdateSerializer(
            appointment, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Status updated"})
        return Response(serializer.errors, status=400)


class SampleCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SampleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Sample registered"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestResultCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TestResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Test result added"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestResultDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            result = TestResult.objects.get(id=id)
        except TestResult.DoesNotExist:
            raise Http404("Wynik nie istnieje.")

        if not result.pdf_file:  # lub `result.file`, zależnie od nazwy pola
            raise Http404("Plik PDF nie został wygenerowany.")

        file_path = (
            result.pdf_file.path
        )  # Zakładamy, że masz `FileField` lub `PDFField` w modelu
        if not os.path.exists(file_path):
            raise Http404("Plik PDF nie istnieje na serwerze.")

        return FileResponse(open(file_path, "rb"), content_type="application/pdf")


class LaboratoryListForVerificationView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        labs = Laboratory.objects.filter(is_verified=False)
        serializer = LaboratoryAdminSerializer(labs, many=True)
        return Response(serializer.data)


class LaboratoryVerifyView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, id):
        lab = get_object_or_404(Laboratory, id=id)
        lab.is_verified = True
        lab.save()
        return Response({"status": "verified"}, status=status.HTTP_200_OK)


class LabTestOrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        test_orders = TestOrder.objects.all().select_related("patient__user")
        data = [
            {
                "id": t.id,
                "test_name": t.test_name,
                "ordered_at": t.ordered_at,
                "patient": t.patient.user.username,
            }
            for t in test_orders
        ]
        return Response(data)


class LabTestOrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            test_order = TestOrder.objects.select_related("patient__user").get(id=id)
        except TestOrder.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = TestOrderDetailSerializer(test_order)
        return Response(serializer.data)


class SampleByTestOrderView(ListAPIView):
    serializer_class = SampleSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["test_order"]

    def get_queryset(self):
        return Sample.objects.all()
