// Enhanced image rotation function for atraksi cards
function initializeAtraksiImageRotation(card, data) {
    const imageContainer = card.querySelector('.image-container');
    if (!imageContainer || !data.images || data.images.length <= 1) return;

    // Create rotating images
    const images = data.images.slice(0, 4); // Use up to 4 images
    if (images.length < 2) return;

    // Save existing overlay elements before clearing
    const atraksiInfo = card.querySelector('.atraksi-info');
    const atraksiOverlay = card.querySelector('.atraksi-overlay');

    // Clear only the image container content
    const existingImg = imageContainer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    // Preload all images before starting rotation to prevent jittering
    const loadedImages = [];
    let loadedCount = 0;

    // Function to check if all images are loaded
    function checkAllLoaded() {
        loadedCount++;
        if (loadedCount === images.length) {
            // All images loaded, now add them to DOM
            loadedImages.forEach((img, index) => {
                if (index === 0) img.classList.add('active');
                imageContainer.appendChild(img);
            });
        }
    }

    // Create and preload images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.alt = data.name + ' - Image ' + (index + 1);
        img.className = 'rotating-image';

        // Set fixed dimensions to prevent layout shifts
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';

        // When image loads, add to our loaded images array
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded; // Continue even if an image fails to load

        // Start loading the image
        img.src = src;
        loadedImages.push(img);
    });

    // Re-add the overlay elements if they were removed
    if (atraksiInfo && !card.querySelector('.atraksi-info')) {
        card.appendChild(atraksiInfo);
    }
    if (atraksiOverlay && !card.querySelector('.atraksi-overlay')) {
        card.appendChild(atraksiOverlay);
    }

    let currentIndex = 0;
    let rotationInterval = null;
    let isTransitioning = false;

    // Start rotation on hover
    card.addEventListener('mouseenter', () => {
        if (rotationInterval) clearInterval(rotationInterval);

        // Only start if images are loaded
        if (loadedCount < images.length) return;

        // Start rotation with a slight delay for smoother entry
        setTimeout(() => {
            rotationInterval = setInterval(() => {
                // Prevent overlapping transitions
                if (isTransitioning) return;
                isTransitioning = true;

                const images = imageContainer.querySelectorAll('.rotating-image');
                const currentImg = images[currentIndex];
                const nextIndex = (currentIndex + 1) % images.length;
                const nextImg = images[nextIndex];

                // Add exit animation to current image
                currentImg.classList.add('exiting');
                currentImg.classList.remove('active');

                // Add enter animation to next image
                nextImg.classList.add('entering', 'active');
                nextImg.classList.remove('next');

                // Clean up classes after animation with longer duration for smoother effect
                setTimeout(() => {
                    currentImg.classList.remove('exiting');
                    nextImg.classList.remove('entering');
                    isTransitioning = false; // Allow next transition
                }, 1000); // Match the CSS animation duration

                currentIndex = nextIndex;
            }, 1500); // Longer interval for more elegant transitions and less jittering
        }, 300); // Initial delay for smoother hover start
    });

    // Stop rotation on mouse leave
    card.addEventListener('mouseleave', () => {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }

        // Reset to first image
        const images = imageContainer.querySelectorAll('.rotating-image');
        if (images.length > 0) {
            // Prevent overlapping transitions
            if (isTransitioning) {
                setTimeout(() => {
                    resetToFirstImage(images);
                }, 300);
            } else {
                resetToFirstImage(images);
            }
        }

        function resetToFirstImage(images) {
            isTransitioning = true;
            const currentImg = images[currentIndex];
            const firstImg = images[0];

            // If not already on first image, transition smoothly
            if (currentIndex !== 0) {
                currentImg.classList.add('exiting');
                currentImg.classList.remove('active');

                firstImg.classList.add('entering', 'active');

                setTimeout(() => {
                    currentImg.classList.remove('exiting', 'active');
                    firstImg.classList.remove('entering');
                    images.forEach(img => img.classList.remove('next'));
                    isTransitioning = false;
                }, 800);
            } else {
                // Already on first image, just ensure proper classes
                images.forEach((img, index) => {
                    img.classList.remove('active', 'entering', 'exiting', 'next');
                    if (index === 0) img.classList.add('active');
                });
                isTransitioning = false;
            }
            currentIndex = 0;
        }
    });
}