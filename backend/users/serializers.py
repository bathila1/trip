from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import FavouriteDestination, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.username", read_only=True)  # show email, but not writable

    class Meta:
        model = UserProfile
        fields = ["email", "full_name", "phone", "bio", "profile_picture"]
        read_only_fields = ["email"]




class FavouriteDestinationSerializer(serializers.ModelSerializer):
    destination_id = serializers.IntegerField(source="destination.id", read_only=True)

    class Meta:
        model = FavouriteDestination
        fields = ["destination_id"]
