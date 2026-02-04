from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),   # Django admin panel (now styled by Material Admin)
    path('api/', include('trips.urls')),  # Your Trip API endpoints
    path("api/auth/", include("users.urls")),
    path("api/trips/", include("trips.urls")),
]
