from django.urls import path
from .views import PrescriptionListView, TestResultListView

urlpatterns = [
    path("prescriptions/", PrescriptionListView.as_view(), name="prescriptions"),
    path("test-results/", TestResultListView.as_view(), name="test-results"),
]