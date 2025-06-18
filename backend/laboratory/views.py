from rest_framework.generics import ListAPIView
from .models import LabTest
from .serializers import LabTestSerializer

class LabTestListView(ListAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
