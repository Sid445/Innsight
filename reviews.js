// Star rating functionality
function initializeStarRating() {
    const starRating = document.querySelector('.star-rating');
    if (!starRating) return;

    const stars = starRating.querySelectorAll('i');
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Reset all stars
            stars.forEach(s => s.className = 'far fa-star');
            // Fill stars up to current
            for (let i = 0; i <= index; i++) {
                stars[i].className = 'fas fa-star';
            }
        });

        star.addEventListener('mouseout', () => {
            // Reset all stars
            stars.forEach(s => s.className = 'far fa-star');
            // Restore selected rating
            for (let i = 0; i < selectedRating; i++) {
                stars[i].className = 'fas fa-star';
            }
        });

        star.addEventListener('click', () => {
            selectedRating = index + 1;
            // Update stars
            stars.forEach((s, i) => {
                s.className = i < selectedRating ? 'fas fa-star' : 'far fa-star';
            });
        });
    });
}

// Review form submission
function initializeReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    if (!reviewForm) return;

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reviewText = document.querySelector('#review-text').value;
        const reviewPhotos = document.querySelector('#review-photos').files;
        const starRating = document.querySelector('.star-rating');
        const selectedRating = starRating.querySelectorAll('.fas.fa-star').length;
        
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        if (!reviewText.trim()) {
            alert('Please write a review');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Review submitted:', {
            rating: selectedRating,
            text: reviewText,
            photos: reviewPhotos.length + ' photos'
        });
        
        // Clear form
        reviewForm.reset();
        const stars = starRating.querySelectorAll('i');
        stars.forEach(s => s.className = 'far fa-star');
        alert('Thank you for your review!');
    });
}

// Image gallery functionality
function initializeImageGallery() {
    const reviewPhotos = document.querySelectorAll('.review-photos img');
    if (!reviewPhotos.length) return;

    reviewPhotos.forEach(photo => {
        photo.addEventListener('click', () => {
            // Create modal with larger image
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${photo.src}" alt="Review photo">
                    <button class="close-modal">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);

            // Close modal functionality
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}

// Initialize all reviews functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeStarRating();
    initializeReviewForm();
    initializeImageGallery();
});
