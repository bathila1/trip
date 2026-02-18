from django.contrib import admin
from .models import Category, ThingToDo, Trip, Day, Destination, Stop

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ["name", "user", "start_date", "end_date", "created_at"]
    list_filter = ["user", "start_date", "end_date"]

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "rating"]
    list_filter = ["category"]

@admin.register(Day)
class DayAdmin(admin.ModelAdmin):
    list_display = ["trip", "day_index", "date"]
    list_filter = ["trip"]

@admin.register(Stop)
class StopAdmin(admin.ModelAdmin):
    list_display = ["day", "destination", "order"]
    list_filter = ["day", "destination"]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

@admin.register(ThingToDo)
class ThingToDoAdmin(admin.ModelAdmin):
    list_display = ["topic"]
    search_fields = ["topic"]