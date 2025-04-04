const availableCities = {
    'hyderabad': [
        'Gachibowli',
        'Madhapur',
        'Secunderabad',
        'Begumpet',
        'Kondapur',
        'Ameerpet',
        'Kukatpally',
        'Hi-Tech City',
        'Jubilee Hills',
        'Banjara Hills'
    ],
    'bangalore': [
        'Koramangala',
        'Whitefield',
        'Indiranagar',
        'Electronic City',
        'Jayanagar',
        'HSR Layout',
        'BTM Layout',
        'Marathahalli',
        'JP Nagar',
        'Bellandur'
    ]
};

function getRandomLocations(city, count = 5) {
    city = city.toLowerCase();
    
    if (!availableCities[city]) {
        showAlert();
        return {
            success: false,
            message: `No data available for ${city}.`,
            locations: []
        };
    }

    // Shuffle and get random locations
    const locations = [...availableCities[city]];
    for (let i = locations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [locations[i], locations[j]] = [locations[j], locations[i]];
    }

    return {
        success: true,
        message: `Popular areas in ${city}:`,
        locations: locations.slice(0, count)
    };
}

function showAlert() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-info';
    alertDiv.innerHTML = `
        <i class="fas fa-info-circle"></i>
        Currently available only in Hyderabad and Bangalore
        <button class="close-alert" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => alertDiv.remove(), 5000);
}

// Add CSS for the alert
const style = document.createElement('style');
style.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 40px 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
    }

    .alert-info {
        background-color: #e3f2fd;
        color: #0d47a1;
        border: 1px solid #bbdefb;
    }

    .close-alert {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 5px;
    }

    .close-alert:hover {
        color: #333;
    }

    @keyframes slideIn {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
