import folium
import os
import webbrowser

def create_simple_map():
    # Create a map centered on New York
    m = folium.Map(location=[40.7128, -74.0060], zoom_start=12)
    
    # Add a test marker
    folium.Marker(
        location=[40.7128, -74.0060],
        popup='Test Marker in New York',
        icon=folium.Icon(color='red')
    ).add_to(m)
    
    # Save the map
    map_path = os.path.join(os.getcwd(), 'test_map.html')
    m.save(map_path)
    print(f"Map saved to: {map_path}")
    
    # Try to open the map in the default web browser
    try:
        full_path = 'file:///' + os.path.abspath(map_path).replace('\\', '/')
        print(f"Attempting to open: {full_path}")
        webbrowser.open(full_path)
    except Exception as e:
        print(f"Error opening map: {str(e)}")

if __name__ == "__main__":
    create_simple_map()
