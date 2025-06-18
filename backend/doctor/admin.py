from django.contrib import admin
from .models import Doctor, Prescription, TestOrder

admin.site.register(Doctor)
admin.site.register(Prescription)
admin.site.register(TestOrder)
