from django.contrib import admin
from .models import Laboratory, LabTest, Sample, TestResult

admin.site.register(Laboratory)
admin.site.register(LabTest)
admin.site.register(Sample)
admin.site.register(TestResult)
