from django.contrib import admin
from django.urls import path, include
from users.views import avatar_suggestions

urlpatterns = [
    path('admin/', admin.site.urls),   # Django admin panel (now styled by Material Admin)
    path('api/', include('trips.urls')),  # Your Trip API endpoints
    path("api/auth/", include("users.urls")),
    path("api/trips/", include("trips.urls")),
    # path("avatar-suggestions/", avatar_suggestions, name="avatar-suggestions"),
    path("api/avatar-suggestions/", avatar_suggestions, name="avatar-suggestions"),
]
