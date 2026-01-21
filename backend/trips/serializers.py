from rest_framework import serializers
from .models import Trip
from .models import Destination

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'name', 'destination', 'start_date', 'end_date', 'notes']


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"