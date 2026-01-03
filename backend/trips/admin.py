from django.contrib import admin
from .models import Trip

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('name', 'destination', 'start_date', 'end_date')
    search_fields = ('name', 'destination')
    list_filter = ('destination', 'start_date')