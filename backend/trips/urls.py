from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TripViewSet, DayViewSet, DestinationViewSet, StopViewSet

router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'days', DayViewSet, basename='day')
router.register(r'stops', StopViewSet, basename='stop')
router.register(r'destinations', DestinationViewSet, basename='destination')
router.register(r'categories', CategoryViewSet, basename='category')
urlpatterns = [
    path('', include(router.urls)),
]