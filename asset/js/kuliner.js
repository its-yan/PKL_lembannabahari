// kuliner.js
// Fungsionalitas untuk bagian Kuliner

const KULINER_WHATSAPP_NUMBER = window.KULINER_WHATSAPP_NUMBER || '6281234567892'; // Ambil dari global.js

// Format price in Indonesian Rupiah, e.g., "Rp45.000"
function formatPrice(amount) {
    const value = typeof amount === 'number' ? amount : Number(amount) || 0;
    try {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    } catch (e) {
        // Fallback if Intl is unavailable
        return `Rp ${value.toLocaleString('id-ID')}`;
    }
}

function initializeKuliner() {
    const kulinerTrack = document.getElementById('kulinerTrack');
    if (!kulinerTrack) {
        console.error('Kuliner track tidak ditemukan!');
        return;
    }

    // Bangun kartu kuliner dari data dummy
    buildKulinerCards(kulinerTrack, window.kulinerData);

    // Inisialisasi slider setelah konten terbangun (async build)
    setTimeout(() => {
        setupKulinerSlider();
    }, 350);

    // Inisialisasi pencarian
    bindKulinerSearch();
}

function buildKulinerCards(container, dataArray) {
    // Show loading state
    container.innerHTML = '<div class="kuliner-page"><div class="cards-grid-kuliner kuliner-loading-skeleton"></div></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        container.innerHTML = ''; // Bersihkan konten lama

        const cardsPerPage = 9; // Tampilkan 9 kartu per halaman (3x3)
        const totalPages = Math.ceil(dataArray.length / cardsPerPage);

        if (dataArray.length === 0) {
            container.innerHTML = '<div class="kuliner-page"><div class="cards-grid-kuliner" style="text-align:center; width:100%; padding:20px; color: var(--primary-color);">Tidak ada kuliner ditemukan.</div></div>';
            document.getElementById('kulinerPrev').disabled = true;
            document.getElementById('kulinerNext').disabled = true;
            return;
        }

    for (let p = 0; p < totalPages; p++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'kuliner-page';
        const gridDiv = document.createElement('div');
        gridDiv.className = 'cards-grid-kuliner';

        const startIndex = p * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, dataArray.length);

        for (let i = startIndex; i < endIndex; i++) {
            const data = dataArray[i];
            const card = document.createElement('div');
            card.className = 'card-kuliner';
            card.dataset.kulinerName = data.name;
            card.dataset.kulinerPrice = data.price;
            card.dataset.kulinerDesc = data.desc;

            // Generate food-specific features
            const isPopular = Math.random() > 0.3; // 70% chance of being popular
            const spiceLevel = Math.floor(Math.random() * 3) + 1; // 1-3 spice level
            const isHot = Math.random() > 0.5; // 50% chance of being hot (steam effect)
            
            card.innerHTML = `
                ${isPopular ? '<div class="popularity-badge">🔥 Populer</div>' : ''}
                <div class="card-image-kuliner">
                    <img src="${data.img}" alt="${data.name}" loading="lazy" />
                </div>
                <div class="card-content">
                    <h3>${data.name}</h3>
                    <div class="price-tag">${formatPrice(data.price)}</div>
                    <p>${data.desc}</p>
                    <div class="spice-level">
                        <span class="spice-label">Pedas:</span>
                        ${Array.from({length: 3}, (_, i) => 
                            `<span class="spice-indicator ${i < spiceLevel ? 'active' : ''}"></span>`
                        ).join('')}
                    </div>
                    <button class="btn-pesan-kuliner">
                        <span class="btn-text">Pesan Sekarang</span>
                    </button>
                </div>
            `;
            
            // Add steam effect for hot food
            if (isHot) {
                card.classList.add('steam-effect');
            }
            gridDiv.appendChild(card);

            // Initialize image rotation for this card
            initializeKulinerImageRotation(card, data);

            // Event listener untuk tombol pesan dengan loading state
            const button = card.querySelector('.btn-pesan-kuliner');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Add loading state
                    button.classList.add('loading');
                    button.disabled = true;
                    
                    // Simulate loading delay for better UX
                    setTimeout(() => {
                        openKulinerWhatsapp(data);
                        button.classList.remove('loading');
                        button.disabled = false;
                    }, 800);
                });
            }
            
            // Add card click event for better UX
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-pesan-kuliner')) {
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
    const cards = container.querySelectorAll('.card-kuliner');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    }, 300); // End of setTimeout
}

function setupKulinerSlider() {
    const kulinerTrack = document.getElementById('kulinerTrack');
    const prevBtn = document.getElementById('kulinerPrev');
    const nextBtn = document.getElementById('kulinerNext');
    let currentPage = 0;

    // Debug logging
    console.log('Setting up kuliner slider:', {
        kulinerTrack: !!kulinerTrack,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        totalPages: kulinerTrack ? kulinerTrack.children.length : 0
    });

    function updateSliderPosition() {
        const totalPages = kulinerTrack.children.length;
        kulinerTrack.style.transform = `translateX(-${currentPage * 100}%)`;
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
        console.log('Kuliner next button clicked, currentPage:', currentPage);
        const totalPages = kulinerTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
            console.log('Moved to page:', currentPage);
        }
    });

    updateSliderPosition(); // Inisialisasi posisi slider
}

// Enhanced Kuliner Search with Advanced Features
let searchHistory = JSON.parse(localStorage.getItem('kulinerSearchHistory') || '[]');
let currentFilter = 'all';
let searchTimeout = null;

function bindKulinerSearch() {
    const input = document.getElementById('kulinerSearchInput');
    const searchBtn = document.getElementById('kulinerSearchBtn');
    const kulinerTrack = document.getElementById('kulinerTrack');
    const searchContainer = document.querySelector('.kuliner-search-container');
    const suggestions = document.getElementById('kulinerSuggestions');
    const history = document.getElementById('kulinerHistory');
    const loading = document.querySelector('.kuliner-search-loading');
    const filterChips = document.querySelectorAll('.filter-chip');

    // Initialize search history
    updateSearchHistory();

    const performSearch = (query = input.value) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Show loading state
        loading.classList.add('show');
        searchContainer.classList.add('searching');
        
        searchTimeout = setTimeout(() => {
            const q = query.toLowerCase().trim();
            let filteredData = window.kulinerData;

            // Apply text search
            if (q) {
                filteredData = filteredData.filter(data => 
                    data.name.toLowerCase().includes(q) || 
                    data.desc.toLowerCase().includes(q)
                );
            }

            // Apply category filter
            if (currentFilter !== 'all') {
                filteredData = applyCategoryFilter(filteredData, currentFilter);
            }

            // Hide loading and suggestions
            loading.classList.remove('show');
            searchContainer.classList.remove('searching');
            hideSuggestions();
            hideHistory();

            // Build cards with animation
            buildKulinerCards(kulinerTrack, filteredData);
            setupKulinerSlider();

            // Add to search history if query is not empty
            if (q) {
                addToSearchHistory(q);
            }
        }, 500);
    };

    // Input event with debouncing
    if (input) {
        input.addEventListener('input', (e) => {
            const query = e.target.value;
            
            if (query.length > 0) {
                showSuggestions(query);
            } else {
                hideSuggestions();
                showHistory();
            }
        });

        input.addEventListener('focus', () => {
            if (input.value.length === 0) {
                showHistory();
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                hideSuggestions();
                hideHistory();
            }, 200);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            } else if (e.key === 'Escape') {
                hideSuggestions();
                hideHistory();
            }
        });
    }

    // Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Update current filter
            currentFilter = chip.dataset.filter;
            
            // Perform search with current query
            performSearch();
        });
    });

    // Initialize with "all" filter active
    filterChips[0].classList.add('active');
}

function applyCategoryFilter(data, filter) {
    switch (filter) {
        case 'popular':
            return data.filter(item => Math.random() > 0.3); // Simulate popularity
        case 'spicy':
            return data.filter(item => 
                item.name.toLowerCase().includes('pedas') || 
                item.desc.toLowerCase().includes('pedas') ||
                item.name.toLowerCase().includes('cabe')
            );
        case 'traditional':
            return data.filter(item => 
                item.name.toLowerCase().includes('tradisional') ||
                item.name.toLowerCase().includes('khas') ||
                item.desc.toLowerCase().includes('tradisional')
            );
        case 'dessert':
            return data.filter(item => 
                item.name.toLowerCase().includes('es') ||
                item.name.toLowerCase().includes('pisang') ||
                item.name.toLowerCase().includes('manis')
            );
        default:
            return data;
    }
}

function showSuggestions(query) {
    const suggestions = document.getElementById('kulinerSuggestions');
    const kulinerData = window.kulinerData;
    
    // Generate suggestions based on query
    const matchingItems = kulinerData.filter(data => 
        data.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    if (matchingItems.length > 0) {
        suggestions.innerHTML = matchingItems.map(item => `
            <div class="suggestion-item" data-query="${item.name}">
                <span class="suggestion-icon">🍽️</span>
                <span class="suggestion-text">${item.name}</span>
            </div>
        `).join('');

        // Add click handlers
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const query = item.dataset.query;
                document.getElementById('kulinerSearchInput').value = query;
                performSearch(query);
            });
        });

        suggestions.classList.add('show');
    } else {
        hideSuggestions();
    }
}

function hideSuggestions() {
    const suggestions = document.getElementById('kulinerSuggestions');
    suggestions.classList.remove('show');
}

function showHistory() {
    const history = document.getElementById('kulinerHistory');
    
    if (searchHistory.length > 0) {
        history.innerHTML = searchHistory.slice(0, 5).map(item => `
            <div class="history-item" data-query="${item.query}">
                <span class="history-icon">🕒</span>
                <span class="history-text">${item.query}</span>
                <span class="history-time">${item.time}</span>
            </div>
        `).join('');

        // Add click handlers
        history.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const query = item.dataset.query;
                document.getElementById('kulinerSearchInput').value = query;
                performSearch(query);
            });
        });

        history.classList.add('show');
    }
}

function hideHistory() {
    const history = document.getElementById('kulinerHistory');
    history.classList.remove('show');
}

function addToSearchHistory(query) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Remove if already exists
    searchHistory = searchHistory.filter(item => item.query !== query);
    
    // Add to beginning
    searchHistory.unshift({
        query: query,
        time: timeString,
        timestamp: now.getTime()
    });

    // Keep only last 10 searches
    searchHistory = searchHistory.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('kulinerSearchHistory', JSON.stringify(searchHistory));
    
    updateSearchHistory();
}

function updateSearchHistory() {
    // This function can be used to update the history display if needed
    searchHistory = JSON.parse(localStorage.getItem('kulinerSearchHistory') || '[]');
}

function openKulinerWhatsapp(data) {
    const name = data.name || 'Kuliner';
    const price = formatPrice(data.price);
    const text = encodeURIComponent(
        `Halo, saya ingin memesan:\n- Kuliner: ${name}\n- Harga: ${price}\n\nMohon info ketersediaan.`
    );
    const waUrl = `https://wa.me/${KULINER_WHATSAPP_NUMBER}?text=${text}`;
    window.open(waUrl, '_blank');
}

// Image rotation function for kuliner cards
function initializeKulinerImageRotation(card, data) {
    const cardImage = card.querySelector('.card-image-kuliner');
    if (!cardImage) return;

    // For kuliner, we'll create multiple images from the same source with slight variations
    // or use a simple fade effect since kuliner data doesn't have multiple images
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
