from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = UserProfile
        fields = ["username", "full_name", "phone", "bio", "profile_picture"]


# class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         # Replace username with email
#         email = attrs.get("username")   # SimpleJWT still calls it "username"
#         password = attrs.get("password")

#         try:
#             user = User.objects.get(email=email)
#             attrs["username"] = user.username  # map email → username internally
#         except User.DoesNotExist:
#             raise Exception("No user found with this email")

#         return super().validate(attrs)
