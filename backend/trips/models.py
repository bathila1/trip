from django.db import models

class Trip(models.Model):
    name = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} → {self.destination}"

class Destination(models.Model):
    name = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    long_description = models.TextField()
    image_url = models.URLField(default='https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg', blank=True)
    # rating = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    # is_favorite = models.BooleanField(default=False)
    category = models.CharField(max_length=100, default='default')

    def __str__(self):
        return self.name