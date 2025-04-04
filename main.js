// Responsive Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
let isMenuOpen = false;

// Handle mobile menu
if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isMenuOpen);
    
    // Update toggle button icon
    const icon = navToggle.querySelector('i');
    icon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu && isMenuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    icon.className = 'fas fa-bars';
    isMenuOpen = false;
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    icon.className = 'fas fa-bars';
    isMenuOpen = false;
  }
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation with real-time feedback
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleSelect = document.getElementById('role');

function validateInput(input, validationFn, errorMessage) {
  const isValid = validationFn(input.value);
  const formGroup = input.closest('.form-group');
  const existingError = formGroup.querySelector('.error-message');
  
  if (!isValid) {
    if (!existingError) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      formGroup.appendChild(errorDiv);
    }
    input.classList.add('error');
  } else {
    if (existingError) {
      existingError.remove();
    }
    input.classList.remove('error');
  }
  return isValid;
}

// Real-time email validation
emailInput.addEventListener('input', (e) => {
  validateInput(
    emailInput,
    (value) => isValidEmail(value),
    'Please enter a valid email address'
  );
});

// Real-time password validation
passwordInput.addEventListener('input', (e) => {
  validateInput(
    passwordInput,
    (value) => value.length >= 8,
    'Password must be at least 8 characters long'
  );
});

// Enhanced form submission with loading state
loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Validate all fields
  const isEmailValid = validateInput(
    emailInput,
    (value) => isValidEmail(value),
    'Please enter a valid email address'
  );
  
  const isPasswordValid = validateInput(
    passwordInput,
    (value) => value.length >= 8,
    'Password must be at least 8 characters long'
  );
  
  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  try {
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    // Attempt login
    const response = await mockAuthenticationCall(
      emailInput.value.trim(),
      passwordInput.value,
      roleSelect.value
    );
    
    if (response.success) {
      // Add success animation
      submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
      submitButton.style.backgroundColor = 'var(--success-color)';
      
      // Store authentication token
      sessionStorage.setItem('authToken', response.token);
      
      // Redirect after success animation
      setTimeout(() => {
        const redirectPath = {
          'user': 'user_dashboard.html',
          'hostel-owner': 'owner_dashboard.html',
          'room-owner': 'owner_dashboard.html'
        }[roleSelect.value];
        
        window.location.href = redirectPath;
      }, 1000);
    }
  } catch (error) {
    // Show error state
    submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
    submitButton.style.backgroundColor = 'var(--danger-color)';
    showError('Login failed. Please try again.');
    
    // Reset button state
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      submitButton.style.backgroundColor = '';
    }, 2000);
  }
});

// Improved error message display
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  
  // Add shake animation
  errorDiv.classList.add('shake');
  setTimeout(() => errorDiv.classList.remove('shake'), 500);
  
  // Auto-hide after delay
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    setTimeout(() => {
      errorDiv.style.display = 'none';
      errorDiv.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Generate CSRF token
function generateCSRFToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Set CSRF token on page load
document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = generateCSRFToken();
  sessionStorage.setItem('csrfToken', csrfToken);
});

// Mock authentication function (replace with real API call)
async function mockAuthenticationCall(email, password, role) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is just for demonstration. In a real app, this would be your backend API call
  if (email && password) {
    return {
      success: true,
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
      message: 'Login successful'
    };
  }
  return {
    success: false,
    message: 'Invalid credentials'
  };
}

// Add touch support for mobile devices
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && isMenuOpen) {
            // Swipe left, close menu
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('i');
            icon.className = 'fas fa-bars';
            isMenuOpen = false;
        }
    }

    xDown = null;
    yDown = null;
}

// Add fade-in animation to containers
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.login-container, .dashboard-card');
  containers.forEach(container => {
    container.classList.add('fade-in');
  });
});

// Image Gallery
function initializeGallery() {
  const galleries = document.querySelectorAll('.image-gallery');
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    const dots = gallery.closest('.property-image').querySelectorAll('.dot');
    let currentIndex = 0;

    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      images[index].classList.add('active');
      dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
      });
    });

    // Auto-advance gallery
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 5000);
  });
}

// View Toggle
function initializeViewToggle() {
  const viewToggles = document.querySelectorAll('.view-toggle');
  const propertiesContainer = document.getElementById('propertiesContainer');

  viewToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      viewToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      
      const view = toggle.dataset.view;
      propertiesContainer.className = `favorites-${view}`;
    });
  });
}

// Filters
function initializeFilters() {
  const searchInput = document.getElementById('searchFilter');
  const typeFilter = document.getElementById('typeFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');
  const clearFiltersBtn = document.querySelector('.clear-filters');
  const filterTags = document.querySelectorAll('.filter-tag');

  // Search filter
  searchInput.addEventListener('input', debounce(function(e) {
    const searchTerm = e.target.value.toLowerCase();
    filterProperties();
  }, 300));

  // Dropdown filters
  [typeFilter, priceFilter, sortFilter].forEach(filter => {
    filter.addEventListener('change', () => {
      filterProperties();
      updateFilterTags();
    });
  });

  // Clear filters
  clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    typeFilter.value = 'all';
    priceFilter.value = 'all';
    sortFilter.value = 'recent';
    filterProperties();
    updateFilterTags();
  });

  // Remove filter tags
  filterTags.forEach(tag => {
    const removeBtn = tag.querySelector('i');
    removeBtn.addEventListener('click', () => {
      tag.remove();
      filterProperties();
    });
  });
}

// Compare Properties
function initializeCompare() {
  const compareBtn = document.querySelector('.compare-btn');
  const modal = document.getElementById('compareModal');
  const closeModal = modal.querySelector('.close-modal');
  const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
  let selectedProperties = [];

  compareBtn.addEventListener('click', () => {
    if (selectedProperties.length < 2) {
      showNotification('Please select at least 2 properties to compare');
      return;
    }
    modal.style.display = 'flex';
    populateCompareModal();
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  compareCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const propertyCard = checkbox.closest('.property-card');
      if (checkbox.checked) {
        if (selectedProperties.length >= 3) {
          checkbox.checked = false;
          showNotification('You can compare up to 3 properties at a time');
          return;
        }
        selectedProperties.push(propertyCard);
      } else {
        selectedProperties = selectedProperties.filter(p => p !== propertyCard);
      }
      updateCompareButton();
    });
  });
}

// Share Property
function initializeShare() {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const propertyCard = btn.closest('.property-card');
      const propertyTitle = propertyCard.querySelector('h3').textContent;
      const propertyUrl = window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({
            title: propertyTitle,
            text: `Check out this property on Innsight: ${propertyTitle}`,
            url: propertyUrl
          });
        } catch (err) {
          console.error('Share failed:', err);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(propertyUrl);
        showNotification('Link copied to clipboard!');
      }
    });
  });
}

// Profile Page Functionality
function initializeProfile() {
  const profileForm = document.getElementById('profileForm');
  const avatarUpload = document.getElementById('avatarUpload');
  const changePasswordBtn = document.getElementById('changePassword');

  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // In a real application, you would send this data to your backend
      console.log('Saving profile data:', data);
      
      showNotification('Profile updated successfully!');
    });
  }

  if (avatarUpload) {
    avatarUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          showNotification('Image size should be less than 5MB', 'error');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
          const avatar = avatarUpload.closest('.profile-avatar');
          avatar.style.backgroundImage = `url(${e.target.result})`;
          avatar.style.backgroundSize = 'cover';
          avatar.style.backgroundPosition = 'center';
          avatar.querySelector('i').style.display = 'none';
        };
        reader.readAsDataURL(file);
        
        // In a real application, you would upload this file to your backend
        showNotification('Profile picture updated successfully!');
      }
    });
  }

  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', function() {
      // Create and show password change modal
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Change Password</h2>
          <form id="passwordForm">
            <div class="form-group">
              <label for="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" required>
            </div>
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <input type="password" id="newPassword" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Update Password</button>
            </div>
          </form>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      const closeBtn = modal.querySelector('.close-modal');
      const passwordForm = modal.querySelector('#passwordForm');
      
      closeBtn.onclick = function() {
        modal.remove();
      };
      
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.remove();
        }
      };
      
      passwordForm.onsubmit = function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
          showNotification('New passwords do not match', 'error');
          return;
        }
        
        // In a real application, you would verify the current password
        // and update with the new password on your backend
        console.log('Updating password...');
        
        modal.remove();
        showNotification('Password updated successfully!');
      };
    });
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initializeGallery();
  initializeViewToggle();
  initializeFilters();
  initializeCompare();
  initializeShare();
  initializeProfile();
});

// Handle property actions
document.addEventListener('click', (e) => {
  if (e.target.matches('.more-amenities')) {
    const amenities = e.target.closest('.amenities');
    amenities.classList.toggle('show-all');
    e.target.textContent = amenities.classList.contains('show-all') ? 'Show less' : '+3 more';
  }

  if (e.target.matches('.map-btn')) {
    const location = e.target.closest('.location').textContent.trim();
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');
  }
});
