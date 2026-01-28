from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('full_name', 'phone', 'bio', 'profile_picture')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'profile')

    def to_representation(self, instance):
        """Flatten profile data and rename full_name to fullName."""
        representation = super().to_representation(instance)
        profile_representation = representation.pop('profile')
        
        # If a UserProfile exists, flatten its data into the main representation.
        if profile_representation:
            for key, value in profile_representation.items():
                representation[key] = value

        # Ensure consistent frontend naming.
        if 'full_name' in representation:
            representation['fullName'] = representation.pop('full_name')
        
        # Ensure the `fullName` key exists for frontend consistency, even if null.
        if 'fullName' not in representation:
            representation['fullName'] = None
        
        return representation

