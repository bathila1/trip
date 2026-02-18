from rest_framework import viewsets, permissions
from .models import Category, Trip, Day, Destination, Stop
from .serializers import CategorySerializer, TripSerializer, DaySerializer, DestinationSerializer, StopSerializer


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

# Category viewset for filtering destinations by category in the frontend
#  all users can see categories and filter by them, so no need to restrict by user but no create/update/delete
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all() 
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated()]  # Allow anyone to view categories, but restrict create/update/delete to admins

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        return Category.objects.all()