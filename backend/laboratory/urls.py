from django.urls import path
from .views import LabTestListView
from django.urls import path
from .views import (
    AppointmentRequestListView,
    AppointmentRequestUpdateView,
    SampleCreateView,
    TestResultCreateView
)


urlpatterns = [
    path('lab-tests/', LabTestListView.as_view(), name='lab-test-list'),
    path("appointment-requests/", AppointmentRequestListView.as_view(), name="appointment-list"),
    path("appointment-requests/<int:id>/", AppointmentRequestUpdateView.as_view(), name="appointment-update"),
    path("samples/", SampleCreateView.as_view(), name="sample-create"),
    path("test-results/", TestResultCreateView.as_view(), name="test-result-create"),
]
