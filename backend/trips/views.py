from rest_framework import viewsets, permissions
from .models import Trip, Day, Destination, Stop
from .serializers import TripSerializer, DaySerializer, DestinationSerializer, StopSerializer


class IsOwner(permissions.BasePermission):
    """
    Custom permission: only allow owners of a trip to access it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all() 
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        # Only return trips belonging to the logged-in user
        return Trip.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as the trip owner
        serializer.save(user=self.request.user)

class DayViewSet(viewsets.ModelViewSet):
    queryset = Day.objects.all()  
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Day.objects.filter(trip__user=self.request.user)
    
class StopViewSet(viewsets.ModelViewSet):
    queryset = Stop.objects.all() 
    serializer_class = StopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Stop.objects.filter(day__trip__user=self.request.user)
    

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all() 
    serializer_class = DestinationSerializer
    permission_classes = [permissions.IsAuthenticated]

