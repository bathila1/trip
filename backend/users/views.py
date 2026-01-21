# Create your views here.
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    # ✅ Basic validation
    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Create user
    user = User.objects.create_user(username=username, password=password)
    UserProfile.objects.create(user=user)
    
    return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])   # ✅ only logged-in users can access
def profile(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        # add more fields if needed
    })


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
        return Response(serializer.errors, status=400)