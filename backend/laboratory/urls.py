from django.urls import path
from .views import LabTestListView

urlpatterns = [
    path('lab-tests/', LabTestListView.as_view(), name='lab-test-list'),
]
