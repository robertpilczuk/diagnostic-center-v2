from django.urls import path
from .views import PrescriptionListView, TestResultListView, PatientTestListView

# PatientSearchView

urlpatterns = [
    path("prescriptions/", PrescriptionListView.as_view(), name="prescriptions"),
    path("test-results/", TestResultListView.as_view(), name="test-results"),
    path("tests/", PatientTestListView.as_view(), name="tests"),
]
