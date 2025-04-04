import random
from dataclasses import dataclass
from typing import List
import json

@dataclass
class RoomListing:
    location: str
    room_type: str
    price: float
    size_sqft: int
    features: List[str]
    neighborhood: str
    available_from: str
    description: str

class RoomListingGenerator:
    def __init__(self):
        self.neighborhoods = {
            "New York": ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
            "Los Angeles": ["Downtown", "Hollywood", "Santa Monica", "Venice", "Pasadena"],
            "Chicago": ["Loop", "River North", "Wicker Park", "Lincoln Park", "Lake View"],
            "Miami": ["Downtown Miami", "South Beach", "Brickell", "Coral Gables", "Wynwood"]
        }
        
        self.room_types = ["Studio", "1-Bedroom", "2-Bedroom", "Shared Room", "Private Room"]
        self.features = [
            "Air Conditioning", "Heating", "Washer/Dryer", "Dishwasher", "Furnished",
            "Parking", "Gym", "Pool", "Balcony", "Pet Friendly", "Security System",
            "High-Speed Internet", "Cable TV", "Hardwood Floors", "Walk-in Closet"
        ]
        
        self.months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]

    def generate_price(self, city: str, room_type: str) -> float:
        base_prices = {
            "New York": {"Studio": 2000, "1-Bedroom": 2500, "2-Bedroom": 3500,
                        "Shared Room": 1200, "Private Room": 1500},
            "Los Angeles": {"Studio": 1800, "1-Bedroom": 2200, "2-Bedroom": 3000,
                          "Shared Room": 1000, "Private Room": 1300},
            "Chicago": {"Studio": 1500, "1-Bedroom": 1800, "2-Bedroom": 2500,
                       "Shared Room": 800, "Private Room": 1100},
            "Miami": {"Studio": 1700, "1-Bedroom": 2000, "2-Bedroom": 2800,
                     "Shared Room": 900, "Private Room": 1200}
        }
        
        base_price = base_prices[city][room_type]
        variation = random.uniform(0.8, 1.2)
        return round(base_price * variation, 2)

    def generate_size(self, room_type: str) -> int:
        sizes = {
            "Studio": (350, 600),
            "1-Bedroom": (500, 800),
            "2-Bedroom": (700, 1200),
            "Shared Room": (200, 300),
            "Private Room": (150, 250)
        }
        return random.randint(*sizes[room_type])

    def generate_description(self, room_type: str, neighborhood: str, features: List[str]) -> str:
        descriptions = [
            f"Beautiful {room_type.lower()} in the heart of {neighborhood}",
            f"Charming {room_type.lower()} with great amenities in {neighborhood}",
            f"Modern {room_type.lower()} in prime {neighborhood} location",
            f"Cozy {room_type.lower()} in vibrant {neighborhood}",
            f"Spacious {room_type.lower()} in desirable {neighborhood} area"
        ]
        
        description = random.choice(descriptions)
        feature_text = ", ".join(features[:3])
        return f"{description}. Featuring {feature_text} and more!"

    def generate_listing(self, city: str) -> RoomListing:
        room_type = random.choice(self.room_types)
        neighborhood = random.choice(self.neighborhoods[city])
        num_features = random.randint(3, 6)
        selected_features = random.sample(self.features, num_features)
        available_month = random.choice(self.months)
        
        return RoomListing(
            location=city,
            room_type=room_type,
            price=self.generate_price(city, room_type),
            size_sqft=self.generate_size(room_type),
            features=selected_features,
            neighborhood=neighborhood,
            available_from=f"{available_month} 2024",
            description=self.generate_description(room_type, neighborhood, selected_features)
        )

def generate_listings(city: str, num_listings: int = 5) -> List[dict]:
    generator = RoomListingGenerator()
    listings = []
    
    for _ in range(num_listings):
        listing = generator.generate_listing(city)
        listings.append({
            "location": listing.location,
            "neighborhood": listing.neighborhood,
            "room_type": listing.room_type,
            "price": listing.price,
            "size_sqft": listing.size_sqft,
            "features": listing.features,
            "available_from": listing.available_from,
            "description": listing.description
        })
    
    return listings

if __name__ == "__main__":
    # Example usage
    cities = ["New York", "Los Angeles", "Chicago", "Miami"]
    all_listings = {}
    
    for city in cities:
        city_listings = generate_listings(city, num_listings=5)
        all_listings[city] = city_listings
    
    # Print the results in a formatted way
    print(json.dumps(all_listings, indent=2))
