# Generated by Django 5.2.1 on 2025-06-18 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
