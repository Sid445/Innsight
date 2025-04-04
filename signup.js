// Form validation
const form = document.getElementById('signupForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const fullName = document.getElementById('fullName');

// Show error message
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

// Remove error message
function removeError(input) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error-message');
  if (error) {
    error.remove();
  }
  input.classList.remove('error');
}

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Validate full name
function validateFullName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s]*$/.test(name);
}

// Event listeners for real-time validation
password.addEventListener('input', () => {
  if (password.value.length < 8) {
    showError(password, 'Password must be at least 8 characters long');
  } else {
    removeError(password);
  }
});

confirmPassword.addEventListener('input', () => {
  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, 'Passwords do not match');
  } else {
    removeError(confirmPassword);
  }
});

email.addEventListener('input', () => {
  if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
  } else {
    removeError(email);
  }
});

fullName.addEventListener('input', () => {
  if (!validateFullName(fullName.value)) {
    showError(fullName, 'Please enter a valid full name (letters and spaces only)');
  } else {
    removeError(fullName);
  }
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Validate all fields
  if (!validateFullName(fullName.value)) {
    showError(fullName, 'Please enter a valid full name');
    isValid = false;
  }

  if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  if (password.value.length < 8) {
    showError(password, 'Password must be at least 8 characters long');
    isValid = false;
  }

  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, 'Passwords do not match');
    isValid = false;
  }

  if (isValid) {
    // Store user role and redirect to appropriate dashboard
    const role = document.getElementById('role').value;
    localStorage.setItem('userRole', role);
    
    if (role === 'user') {
      window.location.href = 'user_dashboard.html';
    } else {
      window.location.href = `owner_dashboard.html?role=${role}`;
    }
  }
});
