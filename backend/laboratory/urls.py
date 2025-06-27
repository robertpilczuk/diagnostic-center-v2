from django.urls import path
from .views import (
    LabTestListView,
    AppointmentRequestListView,
    AppointmentRequestUpdateView,
    SampleCreateView,
    TestResultCreateView,
    TestResultDownloadView,
    LaboratoryListForVerificationView,
    LaboratoryVerifyView,
    LabTestOrderListView,
    LabTestOrderDetailView,
    SampleByTestOrderView,
)

urlpatterns = [
    path("lab-tests/", LabTestListView.as_view(), name="lab-test-list"),
    path(
        "appointment-requests/",
        AppointmentRequestListView.as_view(),
        name="appointment-list",
    ),
    path(
        "appointment-requests/<int:id>/",
        AppointmentRequestUpdateView.as_view(),
        name="appointment-update",
    ),
    path("samples/", SampleCreateView.as_view(), name="sample-create"),
    path("test-results/", TestResultCreateView.as_view(), name="test-result-create"),
    path("api/test-results/<int:id>/download/", TestResultDownloadView.as_view()),
    path("api/admin/laboratories/", LaboratoryListForVerificationView.as_view()),
    path("api/admin/laboratories/<int:id>/verify/", LaboratoryVerifyView.as_view()),
    path("lab/test-orders/", LabTestOrderListView.as_view(), name="lab-test-orders"),
    path(
        "lab/test-orders/<int:id>/",
        LabTestOrderDetailView.as_view(),
        name="lab-test-detail",
    ),
    path("samples/", SampleByTestOrderView.as_view(), name="sample-by-test-order"),
]
