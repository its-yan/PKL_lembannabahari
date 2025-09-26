// JavaScript for Aktivitas Wisata section

document.addEventListener('DOMContentLoaded', function() {
    initAktivitasCards();
    initIntersectionObserver();
    initImageSlideshow();
});

function initAktivitasCards() {
    const cards = document.querySelectorAll('.aktivitas-card');
    
    cards.forEach(card => {
        // Add click handler for mobile devices to flip card
        card.addEventListener('click', function() {
            const inner = this.querySelector('.aktivitas-card-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
        
        // Add button click handler for WhatsApp booking
        const btn = card.querySelector('.aktivitas-card-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card flip when button is clicked
                
                // Get activity details from the card
                const cardTitle = card.querySelector('.aktivitas-card-content h3').textContent;
                const cardDescription = card.querySelector('.aktivitas-card-content p').textContent;
                const duration = card.querySelector('.info-item:first-child .info-text').textContent;
                const price = card.querySelector('.info-item:last-child .info-text').textContent;
                
                // Create WhatsApp message template
                const message = `Halo, saya ingin memesan aktivitas wisata di Desa Lembanna:\n\n*${cardTitle}*\n${cardDescription}\n\nDurasi: ${duration}\nHarga: ${price}\n\nMohon informasi lebih lanjut untuk pemesanan. Terima kasih!`;
                
                // WhatsApp phone number (replace with the actual number)
                const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp pengelola wisata
                
                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappURL, '_blank');
            });
        }
    });
}

// Initialize Intersection Observer to detect when section enters viewport
function initIntersectionObserver() {
    const aktivitasSection = document.querySelector('.aktivitas-wisata-section');
    const cards = document.querySelectorAll('.aktivitas-card');
    
    // Create observer for section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When section enters viewport, add visible class to cards with delay
                cards.forEach(card => {
                    card.classList.add('visible');
                });
                
                // Disconnect observer after animation is triggered
                sectionObserver.disconnect();
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of section is visible
    });
    
    // Start observing the section
    if (aktivitasSection) {
        sectionObserver.observe(aktivitasSection);
    }
}

// Initialize image slideshow for aktivitas cards
function initImageSlideshow() {
    // Define image sets for each card (3 images per card)
    const cardImages = {
        // Card 1 - Snorkeling
        0: [
            'asset/img/wisata andalah/Snorkeling.jpg',
        ],
        // Card 2 - Hiking
        1: [
            'asset/img/wisata andalah/tebing-mattoanging.webp',
            'asset/img/wisata andalah/tebing-mattoanging-2.webp',
            'asset/img/wisata andalah/tebing-mattoanging-3.webp'
        ],
        // Card 3 - Caving
        2: [
            'asset/img/wisata andalah/gua-passea-1.webp',
            'asset/img/wisata andalah/gua-passea-2.jpg',
            'asset/img/wisata andalah/gua-passea-3.jpeg'
        ]
    };

    const cards = document.querySelectorAll('.aktivitas-card');
    
    // Set up image rotation for each card
    cards.forEach((card, index) => {
        if (cardImages[index]) {
            const frontImg = card.querySelector('.aktivitas-card-front img');
            const images = cardImages[index];
            let currentImageIndex = 0;
            
            // Store original image for fallback
            const originalSrc = frontImg.src;
            
            // Function to rotate images
            function rotateImage() {
                // Only change image if card is not flipped
                const inner = card.querySelector('.aktivitas-card-inner');
                if (inner.style.transform !== 'rotateY(180deg)') {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    
                    // Create new image element to preload
                    const newImg = new Image();
                    newImg.onload = function() {
                        // Apply fade transition
                        frontImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            frontImg.src = newImg.src;
                            frontImg.style.opacity = '1';
                        }, 300);
                    };
                    
                    newImg.onerror = function() {
                        console.error('Failed to load image:', images[currentImageIndex]);
                        frontImg.src = originalSrc; // Fallback to original image
                    };
                    
                    newImg.src = images[currentImageIndex];
                }
            }
            
            // Start image rotation interval
            const intervalId = setInterval(rotateImage, 1000);
            
            // Store interval ID on the card element for potential cleanup
            card.dataset.intervalId = intervalId;
        }
    });
}