// sewa.js
// Fungsionalitas untuk bagian Sewa

const SEWA_WHATSAPP_NUMBER = window.SEWA_WHATSAPP_NUMBER || '6281234567893'; // Ambil dari global.js

function initializeSewa() {
    const sewaTrack = document.getElementById('sewaTrack');
    if (!sewaTrack) {
        console.error('Sewa track tidak ditemukan!');
        return;
    }

    // Bangun kartu sewa dari data dummy
    buildSewaCards(sewaTrack, window.sewaData);

    // Inisialisasi slider setelah konten terbangun (async build)
    setTimeout(() => {
        setupSewaSlider();
    }, 350);

    // Inisialisasi pencarian
    bindSewaSearch();
}

function buildSewaCards(container, dataArray) {
    // Show loading state
    container.innerHTML = '<div class="sewa-page"><div class="cards-grid-sewa loading-skeleton"></div></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        container.innerHTML = ''; // Bersihkan konten lama

        const cardsPerPage = 3; // Tampilkan 3 kartu per halaman (sesuaikan dengan desain)
        const totalPages = Math.ceil(dataArray.length / cardsPerPage);

        if (dataArray.length === 0) {
            container.innerHTML = '<div class="sewa-page"><div class="cards-grid-sewa" style="text-align:center; width:100%; padding:20px; color: var(--primary-color);">Tidak ada item sewa ditemukan.</div></div>';
            document.getElementById('sewaPrev').disabled = true;
            document.getElementById('sewaNext').disabled = true;
            return;
        }

    for (let p = 0; p < totalPages; p++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'sewa-page';
        const gridDiv = document.createElement('div');
        gridDiv.className = 'cards-grid-sewa';

        const startIndex = p * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, dataArray.length);

        for (let i = startIndex; i < endIndex; i++) {
            const data = dataArray[i];
            const card = document.createElement('div');
            card.className = 'card-sewa';
            card.dataset.sewaName = data.name;
            card.dataset.sewaPrice = data.price;
            card.dataset.sewaUnit = data.unit;
            card.dataset.sewaDesc = data.desc;

            // Generate random availability status
            const isAvailable = Math.random() > 0.1; // 90% chance of being available
            const availabilityText = isAvailable ? 'Tersedia' : 'Tidak Tersedia';
            const availabilityClass = isAvailable ? 'available' : 'unavailable';
            
            card.innerHTML = `
                <div class="availability-badge ${availabilityClass}">${availabilityText}</div>
                <div class="card-image-sewa">
                    <img src="${data.img}" alt="${data.name}" loading="lazy" />
                    <div class="image-overlay"></div>
                </div>
                <div class="card-content">
                    <h3>${data.name}</h3>
                    <div class="price-tag">${formatPrice(data.price, data.unit)}</div>
                    <p>${data.desc}</p>
                    <div class="card-features">
                        <span class="feature-tag">✓ Bebas Biaya Admin</span>
                        <span class="feature-tag">✓ Asuransi Lengkap</span>
                    </div>
                    <button class="btn-pesan-sewa" ${!isAvailable ? 'disabled' : ''}>
                        <span class="btn-text">${isAvailable ? 'Pesan Sekarang' : 'Tidak Tersedia'}</span>
                        <span class="btn-icon">${isAvailable ? '→' : '✕'}</span>
                    </button>
                </div>
            `;
            gridDiv.appendChild(card);

            // Initialize image rotation for this card
            initializeSewaImageRotation(card, data);

            // Event listener untuk tombol pesan dengan loading state
            const button = card.querySelector('.btn-pesan-sewa');
            if (button && !button.disabled) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Add loading state
                    button.classList.add('loading');
                    button.disabled = true;
                    
                    // Simulate loading delay for better UX
                    setTimeout(() => {
                        openSewaWhatsapp(data);
                        button.classList.remove('loading');
                        button.disabled = false;
                    }, 800);
                });
            }
            
            // Add card click event for better UX
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-pesan-sewa')) {
                    // Add subtle click animation
                    card.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 150);
                }
            });
        }
        pageDiv.appendChild(gridDiv);
        container.appendChild(pageDiv);
    }
    
    // Add staggered entrance animation
    const cards = container.querySelectorAll('.card-sewa');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    }, 300); // End of setTimeout
}

function setupSewaSlider() {
    const sewaTrack = document.getElementById('sewaTrack');
    const prevBtn = document.getElementById('sewaPrev');
    const nextBtn = document.getElementById('sewaNext');
    let currentPage = 0;

    // Debug logging
    console.log('Setting up sewa slider:', {
        sewaTrack: !!sewaTrack,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        totalPages: sewaTrack ? sewaTrack.children.length : 0
    });

    function updateSliderPosition() {
        const totalPages = sewaTrack.children.length;
        sewaTrack.style.transform = `translateX(-${currentPage * 100}%)`;
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener('click', () => {
        console.log('Sewa next button clicked, currentPage:', currentPage);
        const totalPages = sewaTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
            console.log('Moved to page:', currentPage);
        }
    });

    updateSliderPosition(); // Inisialisasi posisi slider
}

function bindSewaSearch() {
    const input = document.getElementById('sewaSearchInput');
    const searchBtn = document.getElementById('sewaSearchBtn');
    const sewaTrack = document.getElementById('sewaTrack');

    const performSearch = () => {
        const q = input.value.toLowerCase();
        const filteredData = window.sewaData.filter(data => 
            data.name.toLowerCase().includes(q) || data.desc.toLowerCase().includes(q)
        );
        buildSewaCards(sewaTrack, filteredData);
        setupSewaSlider(); // Reset slider
    };

    if (input) {
        input.addEventListener('input', performSearch);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function openSewaWhatsapp(data) {
    const name = data.name || 'Sewa';
    const price = formatPrice(data.price, data.unit);
    const text = encodeURIComponent(
        `Halo, saya ingin menyewa:\n- Item: ${name}\n- Harga: ${price}\n\nMohon info ketersediaan.`
    );
    const waUrl = `https://wa.me/${SEWA_WHATSAPP_NUMBER}?text=${text}`;
    window.open(waUrl, '_blank');
}

// Image rotation function for sewa cards
function initializeSewaImageRotation(card, data) {
    const cardImage = card.querySelector('.card-image-sewa');
    if (!cardImage) return;

    // For sewa, we'll create multiple images from the same source with slight variations
    // or use a simple fade effect since sewa data doesn't have multiple images
    const images = [data.img]; // For now, just use the single image
    
    // If we had multiple images, we would use them here
    // For demonstration, let's create a simple fade effect
    if (images.length < 2) return;

    // Create rotating images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = data.name + ' - Image ' + (index + 1);
        img.className = 'rotating-image';
        if (index === 0) img.classList.add('active');
        cardImage.appendChild(img);
    });

    let currentIndex = 0;
    let rotationInterval = null;

    // Start rotation on hover
    card.addEventListener('mouseenter', () => {
        if (rotationInterval) clearInterval(rotationInterval);
        
        // Change image immediately on hover
        const images = cardImage.querySelectorAll('.rotating-image');
        if (images.length > 1) {
            const currentImg = images[currentIndex];
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImg = images[nextIndex];

            // Add exit animation to current image
            currentImg.classList.add('exiting');
            currentImg.classList.remove('active');

            // Add enter animation to next image
            nextImg.classList.add('entering', 'active');
            nextImg.classList.remove('next');

            // Clean up classes after animation
            setTimeout(() => {
                currentImg.classList.remove('exiting');
                nextImg.classList.remove('entering');
            }, 600);

            currentIndex = nextIndex;
        }
        
        // Start continuous rotation every second
        rotationInterval = setInterval(() => {
            const images = cardImage.querySelectorAll('.rotating-image');
            const currentImg = images[currentIndex];
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImg = images[nextIndex];

            // Add exit animation to current image
            currentImg.classList.add('exiting');
            currentImg.classList.remove('active');

            // Add enter animation to next image
            nextImg.classList.add('entering', 'active');
            nextImg.classList.remove('next');

            // Clean up classes after animation
            setTimeout(() => {
                currentImg.classList.remove('exiting');
                nextImg.classList.remove('entering');
            }, 600);

            currentIndex = nextIndex;
        }, 1000); // Change every 1 second
    });

    // Stop rotation on mouse leave
    card.addEventListener('mouseleave', () => {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }

        // Reset to first image
        const images = cardImage.querySelectorAll('.rotating-image');
        images.forEach((img, index) => {
            img.classList.remove('active', 'entering', 'exiting', 'next');
            if (index === 0) img.classList.add('active');
        });
        currentIndex = 0;
    });
}
