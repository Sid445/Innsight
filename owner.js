// Get role from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get('role') || 'hostel-owner';

// Update dashboard heading based on role
const roleHeading = document.getElementById('roleHeading');
roleHeading.textContent = role === 'hostel-owner' ? 'Hostel Owner Dashboard' : 'Room Owner Dashboard';

// Responsive Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
    navMenu.classList.remove('active');
  }
});

// Create dashboard content
const formSection = document.getElementById('formSection');

// Profile section
const profileSection = document.createElement('section');
profileSection.id = 'profile';
profileSection.className = 'dashboard-card fade-in';
profileSection.innerHTML = `
  <h2><i class="fas fa-user"></i> Profile Details</h2>
  <form id="updateProfile" class="card-content">
    <div class="form-group">
      <label for="ownerName">Full Name</label>
      <div class="input-icon">
        <i class="fas fa-user"></i>
        <input type="text" id="ownerName" placeholder="Your Full Name" required>
      </div>
    </div>
    <div class="form-group">
      <label for="ownerEmail">Email</label>
      <div class="input-icon">
        <i class="fas fa-envelope"></i>
        <input type="email" id="ownerEmail" placeholder="your.email@example.com" required>
      </div>
    </div>
    <div class="form-group">
      <label for="ownerPhone">Primary Phone</label>
      <div class="input-icon">
        <i class="fas fa-phone"></i>
        <input type="tel" id="ownerPhone" placeholder="Your Primary Phone Number" required>
      </div>
    </div>
    <div class="form-group">
      <label for="alternatePhone">Alternate Phone (Optional)</label>
      <div class="input-icon">
        <i class="fas fa-phone-alt"></i>
        <input type="tel" id="alternatePhone" placeholder="Alternate Phone Number">
      </div>
    </div>
    <div class="form-group">
      <label for="whatsappNumber">WhatsApp Number</label>
      <div class="input-icon">
        <i class="fab fa-whatsapp"></i>
        <input type="tel" id="whatsappNumber" placeholder="WhatsApp Number" required>
      </div>
    </div>
    <div class="form-group">
      <label for="preferredContact">Preferred Contact Method</label>
      <div class="input-icon">
        <i class="fas fa-comment-alt"></i>
        <select id="preferredContact" required>
          <option value="">Select Preferred Contact Method</option>
          <option value="phone">Phone Call</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="availabilityHours">Availability Hours</label>
      <div class="input-icon">
        <i class="fas fa-clock"></i>
        <input type="text" id="availabilityHours" placeholder="e.g., 9 AM - 6 PM" required>
      </div>
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <div class="input-icon">
        <i class="fas fa-map-marker-alt"></i>
        <textarea id="address" placeholder="Your Complete Address" required></textarea>
      </div>
    </div>
    <button type="submit" class="btn-primary">
      <i class="fas fa-save"></i> Update Profile
    </button>
  </form>
`;

// Listings section
const listingsSection = document.createElement('section');
listingsSection.id = 'listings';
listingsSection.className = 'dashboard-card fade-in';
listingsSection.innerHTML = `
  <h2><i class="fas fa-list"></i> Add ${role === 'hostel-owner' ? 'Hostel' : 'Room'}</h2>
  <form id="addListing" class="card-content">
    <div class="form-group">
      <label for="listingTitle">Title</label>
      <div class="input-icon">
        <i class="fas fa-heading"></i>
        <input type="text" id="listingTitle" placeholder="Property Title" required>
      </div>
    </div>
    <div class="form-group">
      <label for="listingLocation">Location</label>
      <div class="input-icon">
        <i class="fas fa-map-marker-alt"></i>
        <input type="text" id="listingLocation" placeholder="Property Location" required>
      </div>
    </div>
    <div class="form-group">
      <label for="listingRent">Monthly Rent</label>
      <div class="input-icon">
        <i class="fas fa-rupee-sign"></i>
        <input type="number" id="listingRent" placeholder="Rent Amount" required>
      </div>
    </div>
    <div class="form-group">
      <label for="securityDeposit">Security Deposit</label>
      <div class="input-icon">
        <i class="fas fa-rupee-sign"></i>
        <input type="number" id="securityDeposit" placeholder="Security Deposit Amount" required>
      </div>
    </div>
    <div class="form-group">
      <label for="listingDesc">Description</label>
      <textarea id="listingDesc" placeholder="Describe your property" required></textarea>
    </div>
    <div class="form-group">
      <label>Property Type</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="propertyType" value="boys" required> Boys Only
        </label>
        <label class="radio-label">
          <input type="radio" name="propertyType" value="girls" required> Girls Only
        </label>
        ${role === 'hostel-owner' ? `
          <label class="radio-label">
            <input type="radio" name="propertyType" value="unisex"> Unisex
          </label>
        ` : ''}
      </div>
    </div>
    <div class="form-group">
      <label for="listingAmenities">Amenities</label>
      <div class="amenities-grid">
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="wifi"> Wi-Fi
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="ac"> AC
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="parking"> Parking
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="laundry"> Laundry
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="food"> Food Available
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="security"> Security
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="cleaning"> Cleaning Service
        </label>
        <label class="checkbox-label">
          <input type="checkbox" name="amenities" value="furniture"> Furnished
        </label>
      </div>
    </div>
    <div class="form-group">
      <label for="listingRules">Rules & Regulations</label>
      <textarea id="listingRules" placeholder="Enter rules and regulations for tenants" required></textarea>
    </div>
    <div class="form-group">
      <label for="listingImages">Property Images</label>
      <div class="input-icon">
        <i class="fas fa-images"></i>
        <input type="file" id="listingImages" multiple accept="image/*" required>
      </div>
      <small class="help-text">Upload clear images of rooms, bathroom, and common areas</small>
    </div>
    <button type="submit" class="btn-primary">
      <i class="fas fa-plus"></i> Add Listing
    </button>
  </form>
`;

// Add sections to dashboard
formSection.appendChild(profileSection);
formSection.appendChild(listingsSection);

// Form validation functions
function validatePhone(phone) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const existingError = formGroup.querySelector('.error-message');
  
  if (existingError) {
    existingError.textContent = message;
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
  }
  
  input.classList.add('error');
}

function removeError(input) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error-message');
  if (error) {
    error.remove();
  }
  input.classList.remove('error');
}

// Image upload preview
function handleImageUpload(input) {
  const file = input.files[0];
  const previewContainer = input.parentElement.querySelector('.image-preview');
  
  if (!previewContainer) {
    const preview = document.createElement('div');
    preview.className = 'image-preview mt-2';
    input.parentElement.appendChild(preview);
  }
  
  if (file) {
    if (!file.type.startsWith('image/')) {
      showError(input, 'Please upload an image file');
      input.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-image';
      previewContainer.innerHTML = '';
      previewContainer.appendChild(img);
    }
    reader.readAsDataURL(file);
  }
}

// Update profile form validation
document.getElementById('updateProfile').addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  const email = document.getElementById('ownerEmail');
  const phone = document.getElementById('ownerPhone');
  const altPhone = document.getElementById('alternatePhone');
  const whatsapp = document.getElementById('whatsappNumber');

  if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  if (!validatePhone(phone.value)) {
    showError(phone, 'Please enter a valid phone number');
    isValid = false;
  }

  if (altPhone.value && !validatePhone(altPhone.value)) {
    showError(altPhone, 'Please enter a valid phone number');
    isValid = false;
  }

  if (whatsapp.value && !validatePhone(whatsapp.value)) {
    showError(whatsapp, 'Please enter a valid WhatsApp number');
    isValid = false;
  }

  if (isValid) {
    // Save profile data (to be implemented with backend)
    alert('Profile updated successfully!');
  }
});

document.getElementById('addListing').addEventListener('submit', function(e) {
  e.preventDefault();
  const amenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
    .map(checkbox => checkbox.value);
  
  const formData = {
    title: document.getElementById('listingTitle').value,
    location: document.getElementById('listingLocation').value,
    rent: document.getElementById('listingRent').value,
    securityDeposit: document.getElementById('securityDeposit').value,
    description: document.getElementById('listingDesc').value,
    propertyType: document.querySelector('input[name="propertyType"]:checked').value,
    amenities: amenities,
    rules: document.getElementById('listingRules').value,
    images: document.getElementById('listingImages').files
  };
  console.log('Adding new listing:', formData);
  // TODO: Add API call to create listing
  alert('Listing added successfully!');
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");

  const formSection = document.getElementById("formSection");
  const roleHeading = document.getElementById("roleHeading");

  if (role === "hostel-owner") {
    roleHeading.textContent = "Hostel Owner Dashboard";
    formSection.innerHTML = `
      <h2>Add Hostel Listing</h2>
      <form id="hostelForm">
        <input type="text" placeholder="Hostel Name" required>
        <input type="number" placeholder="Rent per Month (₹)" required>
        <textarea placeholder="Amenities (e.g., Wi-Fi, Cleaning, Food)" required></textarea>
        <input type="file" multiple required>
        <input type="text" placeholder="Location" required>
        <select required>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="unisex">Unisex</option>
        </select>
        <input type="text" placeholder="Closing Timings" required>
        <button type="submit">Add Hostel</button>
      </form>
    `;
  } else if (role === "room-owner") {
    roleHeading.textContent = "Room Owner Dashboard";
    formSection.innerHTML = `
      <h2>Add Room Listing</h2>
      <form id="roomForm">
        <input type="text" placeholder="Room Title" required>
        <input type="number" placeholder="Rent per Month (₹)" required>
        <textarea placeholder="Description (e.g., Size, Features)" required></textarea>
        <input type="file" multiple required>
        <input type="text" placeholder="Location" required>
        <select required>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
        </select>
        <input type="text" placeholder="Additional Costs (e.g., Electricity, Water)" required>
        <button type="submit">Add Room</button>
      </form>
    `;
  }

  // Handle form submissions
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    if (role === "hostel-owner") {
      alert("Hostel listing added successfully!");
    } else if (role === "room-owner") {
      alert("Room listing added successfully!");
    }
  });
});
