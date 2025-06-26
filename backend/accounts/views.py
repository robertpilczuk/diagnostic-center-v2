from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserMeSerializer
from rest_framework import status
from .serializers import RegisterSerializer, UserMeSerializer
from rest_framework.permissions import AllowAny

from drf_yasg.utils import swagger_auto_schema


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(request.user)
        return Response(serializer.data)


class RegisterView(APIView):

    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        is_admin = request.user.is_authenticated and request.user.is_admin

        if request.user.is_authenticated:
            return Response(
                {"error": "You are already logged in."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # if not is_admin and request.data.get("user_type") != "is_patient":
        #     return Response(
        #         {"error": "Only patients can register through this endpoint."},
        #         status=status.HTTP_403_FORBIDDEN,
        #     )

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.permissions import IsAdminUser


class AdminCreateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created by admin"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
