from django.urls import path
from .views import login, register, profile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("profile/", profile, name="profile"),
    # path("login/", EmailTokenObtainPairView.as_view(), name="login"),
    # path("login/", TokenObtainPairView.as_view(), name="login"),
]