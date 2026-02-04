from rest_framework.routers import DefaultRouter
from .views import DestinationViewSet, TripViewSet

router = DefaultRouter()
router.register(r'destinations', DestinationViewSet)
router.register(r'trips', TripViewSet)

urlpatterns = router.urls