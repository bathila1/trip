from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import FavouriteDestination, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.username")
    full_name = serializers.CharField(source="user.profile.full_name")


    class Meta:
        model = UserProfile
        
        #all fields with **
        fields = "__all__"


class FavouriteDestinationSerializer(serializers.ModelSerializer):
    destination_id = serializers.IntegerField(source="destination.id", read_only=True)

    class Meta:
        model = FavouriteDestination
        fields = ["destination_id"]
