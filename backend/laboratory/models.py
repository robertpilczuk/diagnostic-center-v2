from django.db import models
from doctor.models import TestOrder

class Laboratory(models.Model):
    name = models.CharField(max_length=100)

class LabTest(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Sample(models.Model):
    test_order = models.ForeignKey(TestOrder, on_delete=models.CASCADE)
    collected_at = models.DateTimeField(auto_now_add=True)

class TestResult(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    result_data = models.TextField()
    result_date = models.DateTimeField(auto_now_add=True)
