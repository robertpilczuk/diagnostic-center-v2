from django.urls import path
from .views import (
    PatientSearchView,
    PrescriptionCreateView,
    TestOrderCreateView,
    TestOrderResultView
)

urlpatterns = [
    path("patients/", PatientSearchView.as_view(), name="patient-search"),
    path("prescriptions/", PrescriptionCreateView.as_view(), name="prescription-create"),
    path("test-orders/", TestOrderCreateView.as_view(), name="test-order-create"),
    path("test-orders/<int:id>/results/", TestOrderResultView.as_view(), name="test-order-results"),
]
