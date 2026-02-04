# Create your views here.
from decouple import config
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# from django.core.mail import send_mail

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

@api_view(["POST"])
def register(request):
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("full_name", "")  # ✅ capture full name

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password)
    UserProfile.objects.create(user=user, full_name=full_name)

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    return Response({
        "access": access,
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": full_name,
        }
    }, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Authenticate using email as username
    user = authenticate(username=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    # ✅ Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    return Response({
        "access": access,
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.profile.full_name if hasattr(user, 'profile') else None,
        }
    }, status=status.HTTP_200_OK)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = request.user.profile

    if request.method == "GET":
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Email verification and password reset views would go here can be added similarly.
@api_view(["POST"])
def request_password_reset(request):
    email = request.data.get("email")
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    token_generator = PasswordResetTokenGenerator()
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)

    reset_link = f"{config('GMAIL_RESET_PASS_FRONTEND_URL')}?uidb64={uidb64}&token={token}"
    # Render HTML template
    html_content = render_to_string("emails/password_reset.html", {
        "user": user,
        "reset_link": reset_link,
        "expiry_time": 15,  # 15 minutes in seconds
    })
    text_content = strip_tags(html_content)  # fallback plain text

    # Send email
    subject = "Password Reset Request"
    from_email = config("DEFAULT_FROM_EMAIL")
    email_message = EmailMultiAlternatives(subject, text_content, from_email, [email])
    email_message.attach_alternative(html_content, "text/html")
    email_message.send()

    return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def confirm_password_reset(request):
    uidb64 = request.data.get("uidb64")
    token = request.data.get("token")
    new_password = request.data.get("new_password")

    #decode uidb64 to get user id
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        return Response({"error": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)
    
    #validate token
    token_generator = PasswordResetTokenGenerator()
    if not token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    #set new password
    user.set_password(new_password)
    user.save()
    return Response({"message": "Password has been reset successfully!"}, status=status.HTTP_200_OK)