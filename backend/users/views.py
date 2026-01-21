# Create your views here.
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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

    return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
