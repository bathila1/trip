from rest_framework import serializers
from .models import Category, ThingToDo, Trip, Day, Destination, Stop

class DestinationSerializer(serializers.ModelSerializer):
    #  show thingstodo foreign key in destination serializer
    things_to_do = serializers.SerializerMethodField()
    class Meta:
        model = Destination
        fields = "__all__"

    def get_things_to_do(self, obj):
        things = ThingToDo.objects.filter(destination_id=obj.id)
        return ThingToDoSerializer(things, many=True).data

class ThingToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThingToDo
        fields = "__all__"


class StopSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(read_only=True)
    destination_id = serializers.PrimaryKeyRelatedField(
        queryset=Destination.objects.all(),
        source="destination",
        write_only=True
    )

    class Meta:
        model = Stop
        fields = ["id", "order", "destination", "destination_id"]

class DaySerializer(serializers.ModelSerializer):
    stops = StopSerializer(many=True)

    class Meta:
        model = Day
        fields = ["id", "day_index", "date", "stops"]

    def create(self, validated_data):
        stops_data = validated_data.pop("stops", [])
        day = Day.objects.create(**validated_data)
        for stop_data in stops_data:
            Stop.objects.create(day=day, **stop_data)
        return day

class TripSerializer(serializers.ModelSerializer):
    days = DaySerializer(many=True)

    class Meta:
        model = Trip
        fields = ["id", "user", "name", "start_date", "end_date", "created_at", "days"]
        read_only_fields = ["user", "created_at"]


    def create(self, validated_data):
        days_data = validated_data.pop("days", [])
        trip = Trip.objects.create(**validated_data)
        for day_data in days_data:
            stops_data = day_data.pop("stops", [])
            day = Day.objects.create(trip=trip, **day_data)
            for stop_data in stops_data:
                Stop.objects.create(day=day, **stop_data)
        return trip

    def update(self, instance, validated_data):
        days_data = validated_data.pop("days", [])
        instance.name = validated_data.get("name", instance.name)
        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.save()

        # Replace days/stops (simple strategy)
        instance.days.all().delete()
        for day_data in days_data:
            stops_data = day_data.pop("stops", [])
            day = Day.objects.create(trip=instance, **day_data)
            for stop_data in stops_data:
                Stop.objects.create(day=day, **stop_data)

        return instance

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

