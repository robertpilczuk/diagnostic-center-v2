from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from accounts.models import User
from patient.models import Patient
from doctor.models import Doctor
from laboratory.models import Laboratory

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    user_type = serializers.ChoiceField(choices=['is_patient', 'is_doctor', 'is_laboratory'])
    pesel = serializers.CharField()
    date_of_birth = serializers.DateField()
    address = serializers.CharField()
    phone_number = serializers.CharField()
    specialization = serializers.CharField(required=False)  # tylko dla lekarza

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Hasła nie są takie same.")
        validate_password(data['password1'])
        return data

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        password = validated_data.pop('password1')
        validated_data.pop('password2')

        specialization = validated_data.pop('specialization', None)

        # Dane użytkownika
        username = validated_data.pop('username')
        email = validated_data.pop('email')

        # Tworzenie użytkownika
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Ustawiamy typ użytkownika
        if user_type == 'is_patient':
            user.is_patient = True
            Patient.objects.create(
                user=user,
                pesel=validated_data['pesel'],
                date_of_birth=validated_data['date_of_birth'],
                address=validated_data['address'],
                phone_number=validated_data['phone_number']
            )
        elif user_type == 'is_doctor':
            user.is_doctor = True
            Doctor.objects.create(user=user, specialty=specialization)
        elif user_type == 'is_laboratory':
            user.is_laboratory = True
            Laboratory.objects.create(name=username)

        user.save()
        return user


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_patient', 'is_doctor', 'is_laboratory', 'is_verified']
