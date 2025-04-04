import folium
from room_listings_generator import generate_listings
import os

def create_map_with_listings():
    # Create a map centered on the United States
    m = folium.Map(location=[39.8283, -98.5795], zoom_start=4)
    
    # City coordinates
    cities = {
        "New York": {"coords": (40.7128, -74.0060), "color": "red"},
        "Los Angeles": {"coords": (34.0522, -118.2437), "color": "blue"},
        "Chicago": {"coords": (41.8781, -87.6298), "color": "green"},
        "Miami": {"coords": (25.7617, -80.1918), "color": "purple"}
    }
    
    # Generate and add listings for each city
    for city_name, city_info in cities.items():
        # Generate listings for this city
        listings = generate_listings(city_name, num_listings=5)
        
        # Add a marker for the city with all its listings
        listings_html = f"<h3>{city_name} Listings</h3>"
        for listing in listings:
            listings_html += f"""
            <div style='margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;'>
                <strong>{listing['room_type']}</strong> in {listing['neighborhood']}<br>
                Price: ${listing['price']:,.2f}<br>
                Size: {listing['size_sqft']} sq ft<br>
                Features: {', '.join(listing['features'][:3])}<br>
                Available: {listing['available_from']}
            </div>
            """
        
        folium.Marker(
            location=city_info["coords"],
            popup=folium.Popup(listings_html, max_width=300),
            icon=folium.Icon(color=city_info["color"], icon='info-sign')
        ).add_to(m)
    
    # Save the map
    output_path = os.path.join(os.getcwd(), 'room_listings_map_v2.html')
    m.save(output_path)
    print(f"\nMap has been generated at: {output_path}")
    print("Please open this file in your web browser to view the listings map.")

if __name__ == "__main__":
    create_map_with_listings()
