from django.urls import path
from .views import (
    PatientSearchView,
    PrescriptionCreateView,
    TestOrderCreateView,
    TestOrderResultView,
    DoctorListForVerificationView,
    DoctorVerifyView
)

urlpatterns = [
    path("patients/", PatientSearchView.as_view(), name="patient-search"),
    path("prescriptions/", PrescriptionCreateView.as_view(), name="prescription-create"),
    path("test-orders/", TestOrderCreateView.as_view(), name="test-order-create"),
    path("test-orders/<int:id>/results/", TestOrderResultView.as_view(), name="test-order-results"),
    path('api/admin/doctors/', DoctorListForVerificationView.as_view()),
    path('api/admin/doctors/<int:id>/verify/', DoctorVerifyView.as_view()),
]
