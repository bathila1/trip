from django.db import models
from django.contrib.auth.models import User

from django.conf import settings
from trips.models import Destination   # import your existing Destination model

class FavouriteDestination(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favourites"
    )
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="favourited_by"
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "destination")  # prevent duplicates

    def __str__(self):
        return f"{self.user.email} - {self.destination.id}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
    
# defaultly showing avatar suggestions api
class AvatarSuggestion(models.Model):
    image_url = models.URLField()

    def __str__(self):
        return self.image_url