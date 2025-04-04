// Infinite scroll configuration
const infiniteScroll = {
    page: 1,
    perPage: 5,
    loading: false,
    hasMore: true,
    container: null,
    loadingSpinner: null,
};

// Create and append loading spinner
function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    spinner.style.display = 'none';
    return spinner;
}

// Initialize infinite scroll
function initializeInfiniteScroll() {
    infiniteScroll.container = document.querySelector('.search-results');
    if (!infiniteScroll.container) return;

    // Add loading spinner
    infiniteScroll.loadingSpinner = createLoadingSpinner();
    infiniteScroll.container.parentNode.appendChild(infiniteScroll.loadingSpinner);

    // Add intersection observer for infinite scroll
    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !infiniteScroll.loading && infiniteScroll.hasMore) {
                loadMoreProperties();
            }
        });
    }, options);

    // Observe the last property card
    updateObserver(observer);
}

// Update observer target
function updateObserver(observer) {
    const propertyCards = document.querySelectorAll('.property-card');
    if (propertyCards.length > 0) {
        observer.observe(propertyCards[propertyCards.length - 1]);
    }
}

// Mock property data generator (replace with actual API call)
function generateMockProperty(index) {
    const locations = ['Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City', 'Whitefield'];
    const features = ['WiFi', 'Food', 'AC', 'Laundry', 'Parking'];
    
    return {
        id: `property-${index}`,
        name: `${locations[index % locations.length]} ${index % 2 === 0 ? 'Hostel' : 'PG'}`,
        location: `${locations[index % locations.length]}, Bangalore`,
        price: 7000 + (index * 500),
        rating: (3.5 + (index % 2)).toFixed(1),
        reviews: 10 + index,
        features: features.slice(0, 2 + (index % 3)),
        image: `https://source.unsplash.com/800x600/?hostel,room&sig=${index}`
    };
}

// Load more properties
async function loadMoreProperties() {
    infiniteScroll.loading = true;
    infiniteScroll.loadingSpinner.style.display = 'block';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, this would be an API call
    const newProperties = Array.from({ length: infiniteScroll.perPage }, (_, i) => 
        generateMockProperty(((infiniteScroll.page - 1) * infiniteScroll.perPage) + i)
    );

    // Append new properties
    newProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        infiniteScroll.container.appendChild(propertyCard);
    });

    // Update state
    infiniteScroll.page++;
    infiniteScroll.loading = false;
    infiniteScroll.loadingSpinner.style.display = 'none';

    // Check if we should stop loading (for demo purposes, stop after 5 pages)
    if (infiniteScroll.page > 5) {
        infiniteScroll.hasMore = false;
        infiniteScroll.loadingSpinner.remove();
    }

    // Initialize favorite buttons for new cards
    initializeFavoriteButtons();
}

// Create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <img src="${property.image}" alt="${property.name}">
        <div class="property-info">
            <h3>${property.name}</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <p class="price">₹${property.price.toLocaleString()}/month</p>
            <div class="rating-info">
                <span class="stars">
                    ${generateStars(property.rating)}
                </span>
                <span class="rating-text">${property.rating} (${property.reviews} reviews)</span>
            </div>
            <div class="property-features">
                ${property.features.map(feature => 
                    `<span><i class="fas fa-${getFeatureIcon(feature)}"></i> ${feature}</span>`
                ).join('')}
            </div>
            <div class="card-actions">
                <a href="bangalore-property-details.html?id=${property.id}&name=${encodeURIComponent(property.name)}&price=${property.price}&location=${encodeURIComponent(property.location)}&rating=${property.rating}&reviews=${property.reviews}" class="btn-primary">View Details</a>
                <button class="btn-secondary favorite-btn">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// Get icon for feature
function getFeatureIcon(feature) {
    const icons = {
        'WiFi': 'wifi',
        'Food': 'utensils',
        'AC': 'snowflake',
        'Laundry': 'tshirt',
        'Parking': 'parking'
    };
    return icons[feature] || 'check';
}

// Initialize favorite buttons
function initializeFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        if (!btn.hasListener) {
            btn.hasListener = true;
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                icon.classList.toggle('favorited');
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeInfiniteScroll);
