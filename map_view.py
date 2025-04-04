import folium
from room_listings_generator import generate_listings
import webbrowser
import os

# Dictionary of city coordinates (latitude, longitude)
CITY_COORDINATES = {
    "New York": (40.7128, -74.0060),
    "Los Angeles": (34.0522, -118.2437),
    "Chicago": (41.8781, -87.6298),
    "Miami": (25.7617, -80.1918)
}

# Dictionary of neighborhood coordinates within each city
NEIGHBORHOOD_COORDINATES = {
    "New York": {
        "Manhattan": (40.7831, -73.9712),
        "Brooklyn": (40.6782, -73.9442),
        "Queens": (40.7282, -73.7949),
        "Bronx": (40.8448, -73.8648),
        "Staten Island": (40.5795, -74.1502)
    },
    "Los Angeles": {
        "Downtown": (34.0407, -118.2468),
        "Hollywood": (34.0928, -118.3287),
        "Santa Monica": (34.0195, -118.4912),
        "Venice": (33.9850, -118.4695),
        "Pasadena": (34.1478, -118.1445)
    },
    "Chicago": {
        "Loop": (41.8786, -87.6251),
        "River North": (41.8924, -87.6341),
        "Wicker Park": (41.9088, -87.6796),
        "Lincoln Park": (41.9214, -87.6513),
        "Lake View": (41.9442, -87.6544)
    },
    "Miami": {
        "Downtown Miami": (25.7743, -80.1937),
        "South Beach": (25.7827, -80.1340),
        "Brickell": (25.7617, -80.1918),
        "Coral Gables": (25.7215, -80.2684),
        "Wynwood": (25.8049, -80.1989)
    }
}

def create_map_with_listings():
    # Create a map centered on the United States
    m = folium.Map(location=[39.8283, -98.5795], zoom_start=4)
    
    # Generate listings for each city
    all_listings = {}
    for city in CITY_COORDINATES.keys():
        all_listings[city] = generate_listings(city, num_listings=5)
    
    # Add markers for each listing
    for city, listings in all_listings.items():
        for listing in listings:
            neighborhood = listing['neighborhood']
            if neighborhood in NEIGHBORHOOD_COORDINATES[city]:
                lat, lon = NEIGHBORHOOD_COORDINATES[city][neighborhood]
                
                # Create popup content
                popup_content = f"""
                <div style="width: 250px">
                    <h4>{listing['room_type']} in {neighborhood}</h4>
                    <p><strong>Price:</strong> ${listing['price']:,.2f}</p>
                    <p><strong>Size:</strong> {listing['size_sqft']} sq ft</p>
                    <p><strong>Features:</strong> {', '.join(listing['features'][:3])}</p>
                    <p><strong>Available:</strong> {listing['available_from']}</p>
                </div>
                """
                
                # Add marker with popup
                folium.Marker(
                    location=[lat, lon],
                    popup=folium.Popup(popup_content, max_width=300),
                    icon=folium.Icon(color='red', icon='info-sign')
                ).add_to(m)
    
    # Save the map
    map_path = os.path.join(os.getcwd(), 'room_listings_map.html')
    m.save(map_path)
    
    # Open the map in the default web browser
    webbrowser.open('file://' + os.path.abspath(map_path))

if __name__ == "__main__":
    create_map_with_listings()
