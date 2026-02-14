from django.urls import path
from .views import confirm_password_reset, favourite_destinations, google_login, login, register, profile, request_password_reset
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("profile/", profile, name="profile"),
    path("password-reset/", request_password_reset, name="password_reset"),
    path("password-reset-confirm/", confirm_password_reset, name="password_reset_confirm"),  
    path("google/", google_login, name="google-login"),    
    path("favourite-destinations/", favourite_destinations, name="favourite-destinations"),
]