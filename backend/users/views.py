# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def register(request):
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("fullName", "")  # ✅ capture full name

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password)
    UserProfile.objects.create(user=user, full_name=full_name)

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    return Response({
        "accessToken": access,
        "refreshToken": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "fullName": full_name,
        }
    }, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Authenticate using email as username
    user = authenticate(username=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    # ✅ Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    return Response({
        "accessToken": access,
        "refreshToken": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            # "fullName": user.full_name,
        }
    }, status=status.HTTP_200_OK)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = request.user.profile

    if request.method == "GET":
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)