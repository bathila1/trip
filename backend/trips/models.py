# from django.utils import timezone
# from django.db import models

# class Trip(models.Model):
#     user = models.ForeignKey('auth.User', related_name='trips', on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     destination = models.CharField(max_length=100)
#     start_date = models.DateField()
#     end_date = models.DateField()
#     days = models.JSONField(default=list)
#     each_day_stops = models.JSONField(default=dict)
#     each_stop = models.JSONField(default=dict)
#     notes = models.TextField(blank=True)
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return f"{self.name} → {self.destination}"

# class Destination(models.Model):
#     name = models.CharField(max_length=200)
#     short_description = models.CharField(max_length=300)
#     long_description = models.TextField()
#     image_url = models.URLField(default='https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg', blank=True)
#     latitude = models.FloatField()
#     longitude = models.FloatField()
#     category = models.CharField(max_length=100, default='default')

#     def __str__(self):
#         return self.name
    
# # id, trip(FK), day_index, date
# class TripDay(models.Model):
#     trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
#     day_index = models.IntegerField()
#     date = models.DateField()

#     def __str__(self):
#         return f"{self.trip.name} - Day {self.day_index}"
    
# # TripStop
# # id, trip_day(FK), destination(FK), position (for ordering)

# class TripStop(models.Model):
#     trip_day = models.ForeignKey(TripDay, on_delete=models.CASCADE)
#     destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
#     position = models.IntegerField()

from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=["user", "created_at"]),
        ]
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="trips"
    )

    name = models.CharField(max_length=255)

    start_date = models.DateField()
    end_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

class Day(models.Model):
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="days"
    )

    day_index = models.PositiveIntegerField()
    date = models.DateField()

    class Meta:
        ordering = ["day_index"]
        unique_together = ("trip", "day_index")

    def __str__(self):
        return f"{self.trip.name} - Day {self.day_index}"

class Destination(models.Model):
    CATEGORY_CHOICES = [
        (1, "Beaches"),
        (2, "Hills"),
        (3, "Cultural"),
        (4, "Wildlife"),
        (5, "Historical"),
    ]

    name = models.CharField(max_length=255)
    image_url = models.URLField()
    short_description = models.TextField()
    long_description = models.TextField(default="")
    category = models.IntegerField(choices=CATEGORY_CHOICES)
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Stop(models.Model):
    day = models.ForeignKey(
        Day,
        on_delete=models.CASCADE,
        related_name="stops"
    )

    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE
    )

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.destination.name} ({self.day})"
