from django.db import models

# Trip model structure:
# id
# user (FK to auth.User)
# name (string)
# destination (FK to Destination)
# notes (string)
# created_at (YYYY-MM-DD HH:MM:SS)
# updated_at (YYYY-MM-DD HH:MM:SS)
# start_date (YYYY-MM-DD)
# end_date (YYYY-MM-DD)
# days[] array (generated from date range)
# each_day: { day_index: 1..N, date: YYYY-MM-DD, stops: [] }
# stops[] is the ordered list of destinations added for that day
# each stop: { destination_id, position } (position = 0,1,2… for drag/drop order) ✅ The local stop.id we generate is temporary; DB should create real ids.

class Trip(models.Model):
    user = models.ForeignKey('auth.User', related_name='trips', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    days = models.JSONField(default=list)
    each_day_stops = models.JSONField(default=dict)
    each_stop = models.JSONField(default=dict)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} → {self.destination}"

class Destination(models.Model):
    name = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    long_description = models.TextField()
    image_url = models.URLField(default='https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg', blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    category = models.CharField(max_length=100, default='default')

    def __str__(self):
        return self.name
    
# id, trip(FK), day_index, date
class TripDay(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    day_index = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.trip.name} - Day {self.day_index}"
    
# TripStop
# id, trip_day(FK), destination(FK), position (for ordering)

class TripStop(models.Model):
    trip_day = models.ForeignKey(TripDay, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    position = models.IntegerField()
