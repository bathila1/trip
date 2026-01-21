from django.core.management.base import BaseCommand
from trips.models import Destination

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        data = [
            {
                
                'name': "Ella Rock",
                'short_description': "Scenic hike with beautiful views.",
                'long_description': "Ella Rock is one of Sri Lanka’s most stunning viewpoints. The trek takes around 4 hours and offers lush greenery, panoramic landscapes, and a refreshing chill climate.",
                
                'latitude': 6.8650,
                'longitude': 81.0468,
                
                'category': "hills",
            },
            {
                
                'name': "Sigiriya",
                'short_description': "Historic rock fortress.",
                'long_description': "Sigiriya is an ancient rock fortress located in the central province of Sri Lanka. Known for its unique architecture, frescoes, and the breathtaking view from the top.",
                
                'latitude': 7.9570,
                'longitude': 80.7603,
                
                'category': "historical",
            },
            {
                
                'name': "Mirissa",
                'short_description': "Relaxing beach with whale watching.",
                'long_description': "Mirissa offers one of the most beautiful beaches in Sri Lanka. Tourists visit for whale watching, surfing, and relaxing seaside holidays.",
                
                'latitude': 5.9485,
                'longitude': 80.4716,
                
                'category': "beaches",
            },
            {
                
                'name': "Nuwara Eliya",
                'short_description': "Sri Lanka’s little England.",
                'long_description': "Known for its cool climate, tea plantations, and colonial-era buildings, Nuwara Eliya is a popular retreat for both locals and tourists.",
                
                'latitude': 6.9497,
                'longitude': 80.7891,
                
                'category': "hills",
            },
            {
                
                'name': "Unawatuna",
                'short_description': "Beach paradise for snorkeling.",
                'long_description': "Unawatuna is one of Sri Lanka’s most iconic coastal areas, known for snorkeling, surfing, and vibrant nightlife.",
                
                'latitude': 6.0131,
                'longitude': 80.2468,
                
                'category': "beaches",
            },
            {
                
                'name': "Kandy",
                'short_description': "Cultural capital of Sri Lanka.",
                'long_description': "Home to the Temple of the Tooth Relic and surrounded by hills, Kandy is both culturally and historically significant.",
                
                'latitude': 7.2906,
                'longitude': 80.6337,
                
                'category': "cultural",
            },
            {
                
                'name': "Haputale",
                'short_description': "Underrated hill country escape.",
                'long_description': "Haputale is a quiet and peaceful hill area known for Lipton’s Seat viewpoint, cool weather, and tea estates.",
                
                'latitude': 6.7657,
                'longitude': 80.9635,
                
                'category': "hills",
            },
            {
                
                'name': "Bentota",
                'short_description': "Beach + water sports heaven.",
                'long_description': "Bentota is famous for beautiful beaches and water sports including jet skiing, surfing, and diving.",
                
                'latitude': 6.4204,
                'longitude': 79.9956,
                
                'category': "beaches",
            },
            {
                
                'name': "Arugam Bay",
                'short_description': "Top surfing beach in Sri Lanka.",
                'long_description': "Arugam Bay has international recognition for surfing and attracts travelers globally during the season.",
                'latitude': 6.8433,
                'longitude': 81.8304,
                
                'category': "wildlife",
            },
            {
                
                'name': "Jaffna",
                'short_description': "Northern cultural and historical hub.",
                'long_description': "Jaffna offers unique cuisine, beaches, islands, temples, and a distinct northern culture very different from the south.",
                
                'latitude': 9.6615,
                'longitude': 80.0255,
                
                'category': "cultural",
            },
        ]

        for item in data:
            Destination.objects.create(**item)
        self.stdout.write(self.style.SUCCESS('Successfully seeded initial destination data.'))