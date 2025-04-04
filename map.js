let map;
let markers = [];
const properties = [
    {
        name: "Luxury Studio in Manhattan",
        position: { lat: 40.7831, lng: -73.9712 },
        type: "apartment",
        price: 2200,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "Available Now",
        size: "500 sqft",
        features: ["Air Conditioning", "Washer/Dryer", "Gym"]
    },
    {
        name: "Downtown LA Loft",
        position: { lat: 34.0407, lng: -118.2468 },
        type: "apartment",
        price: 1800,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "From June 1st",
        size: "650 sqft",
        features: ["Pool", "Parking", "Pet Friendly"]
    },
    {
        name: "Chicago River View Studio",
        position: { lat: 41.8924, lng: -87.6341 },
        type: "studio",
        price: 1500,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "Available Now",
        size: "400 sqft",
        features: ["High-Speed Internet", "Security System", "Furnished"]
    },
    {
        name: "South Beach Luxury Room",
        position: { lat: 25.7827, lng: -80.1340 },
        type: "room",
        price: 1700,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "From July 1st",
        size: "350 sqft",
        features: ["Balcony", "Beach Access", "Air Conditioning"]
    }
];

function initMap() {
    // Initialize the map centered on United States
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 4,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ],
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow();

    // Add markers for each property
    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: property.position,
            map: map,
            title: property.name,
            icon: {
                url: getMarkerIcon(property.type),
            },
            animation: google.maps.Animation.DROP
        });

        markers.push(marker);

        // Add click listener to marker
        marker.addListener("click", () => {
            const content = `
                <div class="map-info-window">
                    <h3>${property.name}</h3>
                    <p><i class="fas fa-dollar-sign"></i> ${property.price}/month</p>
                    <p><i class="fas fa-ruler-combined"></i> ${property.size}</p>
                    <p><i class="fas fa-calendar-check"></i> ${property.availability}</p>
                    <p><i class="fas fa-list"></i> ${property.features.join(", ")}</p>
                    <a href="property-details.html" class="btn-primary btn-sm">View Details</a>
                </div>
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
    });

    // Add search box functionality
    const searchInput = document.getElementById('location-search');
    const searchBox = new google.maps.places.SearchBox(searchInput);

    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    // Initial update of property list
    updatePropertyList();
}

function getMarkerIcon(type) {
    switch(type) {
        case 'apartment':
            return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        case 'studio':
            return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
        case 'room':
            return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        default:
            return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
}

function applyFilters() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    const propertyType = document.getElementById('property-type').value;

    markers.forEach((marker, i) => {
        const property = properties[i];
        const visible = 
            property.price >= minPrice &&
            property.price <= maxPrice &&
            (propertyType === 'all' || property.type === propertyType);
        
        marker.setVisible(visible);
    });

    updatePropertyList();
}

function updatePropertyList() {
    const listContainer = document.querySelector('.property-list');
    listContainer.innerHTML = '';

    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card map-card';
        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}">
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <p class="price">$${property.price}/month</p>
                <p class="size">${property.size}</p>
                <p class="features">${property.features.join(", ")}</p>
                <p class="availability">${property.availability}</p>
                <a href="property-details.html" class="btn-primary btn-sm">View Details</a>
let map;
let markers = [];
const properties = [
    {
        name: "Luxury Studio in Manhattan",
        position: { lat: 40.7831, lng: -73.9712 },
        type: "apartment",
        price: 2200,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "Available Now",
        size: "500 sqft",
        features: ["Air Conditioning", "Washer/Dryer", "Gym"]
    },
    {
        name: "Downtown LA Loft",
        position: { lat: 34.0407, lng: -118.2468 },
        type: "apartment",
        price: 1800,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "From June 1st",
        size: "650 sqft",
        features: ["Pool", "Parking", "Pet Friendly"]
    },
    {
        name: "Chicago River View Studio",
        position: { lat: 41.8924, lng: -87.6341 },
        type: "studio",
        price: 1500,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "Available Now",
        size: "400 sqft",
        features: ["High-Speed Internet", "Security System", "Furnished"]
    },
    {
        name: "South Beach Luxury Room",
        position: { lat: 25.7827, lng: -80.1340 },
        type: "room",
        price: 1700,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        availability: "From July 1st",
        size: "350 sqft",
        features: ["Balcony", "Beach Access", "Air Conditioning"]
    }
];

function initMap() {
    // Initialize the map centered on United States
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 4,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ],
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow();

    // Add markers for each property
    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: property.position,
            map: map,
            title: property.name,
            icon: {
                url: getMarkerIcon(property.type),
            },
            animation: google.maps.Animation.DROP
        });

        markers.push(marker);

        // Add click listener to marker
        marker.addListener("click", () => {
            const content = `
                <div class="map-info-window">
                    <h3>${property.name}</h3>
                    <p><i class="fas fa-dollar-sign"></i> ${property.price}/month</p>
                    <p><i class="fas fa-ruler-combined"></i> ${property.size}</p>
                    <p><i class="fas fa-calendar-check"></i> ${property.availability}</p>
                    <p><i class="fas fa-list"></i> ${property.features.join(", ")}</p>
                    <a href="property-details.html" class="btn-primary btn-sm">View Details</a>
                </div>
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
    });

    // Add search box functionality
    const searchInput = document.getElementById('location-search');
    const searchBox = new google.maps.places.SearchBox(searchInput);

    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    // Initial update of property list
    updatePropertyList();
}

function getMarkerIcon(type) {
    switch(type) {
        case 'apartment':
            return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        case 'studio':
            return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
        case 'room':
            return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        default:
            return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
}

function applyFilters() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    const propertyType = document.getElementById('property-type').value;

    markers.forEach((marker, i) => {
        const property = properties[i];
        const visible = 
            property.price >= minPrice &&
            property.price <= maxPrice &&
            (propertyType === 'all' || property.type === propertyType);
        
        marker.setVisible(visible);
    });

    updatePropertyList();
}

function updatePropertyList() {
    const listContainer = document.querySelector('.property-list');
    listContainer.innerHTML = '';

    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card map-card';
        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.name}">
            </div>
            <div class="property-info">
                <h3>${property.name}</h3>
                <p class="price">$${property.price}/month</p>
                <p class="size">${property.size}</p>
                <p class="features">${property.features.join(", ")}</p>
                <p class="availability">${property.availability}</p>
                <a href="property-details.html" class="btn-primary btn-sm">View Details</a>
            </div>
        `;
        listContainer.appendChild(card);
    });
}
