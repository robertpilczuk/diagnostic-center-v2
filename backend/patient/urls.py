from django.urls import path
from .views import (
    PatientTestListView,
    PatientTestDetailView,
    PrescriptionListView,
    TestResultListView,
)

urlpatterns = [
    path("tests/", PatientTestListView.as_view(), name="patient-tests"),
    path(
        "tests/<int:pk>/", PatientTestDetailView.as_view(), name="patient-test-detail"
    ),
    path(
        "prescriptions/", PrescriptionListView.as_view(), name="patient-prescriptions"
    ),
    path("test-results/", TestResultListView.as_view(), name="patient-test-results"),
]
