# Generated by Django 5.2.1 on 2025-06-18 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='pesel',
            field=models.CharField(default=1, max_length=11),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='patient',
            name='phone_number',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
    ]
