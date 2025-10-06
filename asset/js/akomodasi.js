// akomodasi.js
// Fungsionalitas untuk bagian Akomodasi

const AKOMODASI_WHATSAPP_NUMBER = window.AKOMODASI_WHATSAPP_NUMBER || '6281234567891'; // Ambil dari global.js

// Tentukan jumlah kartu per halaman secara responsif
function getCardsPerPage() {
    // Mobile kecil: 1 kolom x 2 baris
    if (window.matchMedia('(max-width: 480px)').matches) return 2;
    // Tablet: 2 kolom x 2 baris
    if (window.matchMedia('(max-width: 768px)').matches) return 4;
<<<<<<< HEAD
    // Desktop: ubah jadi 2 kolom x 2 baris agar selalu ada minimal 2 halaman jika data >=5
    return 4;
=======
    // Desktop: ubah jadi 3 kolom x 2 baris (6 kartu per slide)
    return 6;
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
}

function initializeAkomodasi() {
    const akTrack = document.getElementById('akTrack');
    if (!akTrack) {
        console.error('Akomodasi track tidak ditemukan!');
        return;
    }

    // Bangun kartu akomodasi dari data dummy
    buildAkomodasiCards(akTrack, window.akomodasiData);

    // Inisialisasi slider
    setupAkomodasiSlider();

    // Inisialisasi filter, search, sort
    setupAkomodasiToolbar();

    // Inisialisasi modal
    ensureAkomodasiModal();

    // Responsif: rebuild halaman ketika breakpoint berubah (cardsPerPage berubah)
    let lastCards = String(akTrack.dataset.cardsPerPage || '');
    function onAkomodasiResize() {
        const current = String(getCardsPerPage());
        if (current !== lastCards) {
            buildAkomodasiCards(akTrack, window.akomodasiData);
            setupAkomodasiSlider();
            lastCards = String(akTrack.dataset.cardsPerPage || current);
        }
    }
    window.addEventListener('resize', onAkomodasiResize);
}

function buildAkomodasiCards(container, dataArray) {
    container.innerHTML = ''; // Bersihkan konten lama

    const cardsPerPage = getCardsPerPage(); // Dinamis: desktop=6, tablet=4, mobile=2
    container.dataset.cardsPerPage = String(cardsPerPage);
    const totalPages = Math.ceil(dataArray.length / cardsPerPage);

    if (dataArray.length === 0) {
        container.innerHTML = '<div class="ak-page"><div class="grid-akomodasi" style="text-align:center; width:100%; padding:20px;">Tidak ada akomodasi ditemukan.</div></div>';
        document.getElementById('akPrev').disabled = true;
        document.getElementById('akNext').disabled = true;
        return;
    }

    for (let p = 0; p < totalPages; p++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'ak-page';
        const gridDiv = document.createElement('div');
        gridDiv.className = 'grid-akomodasi';

        const startIndex = p * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, dataArray.length);

        for (let i = startIndex; i < endIndex; i++) {
            const data = dataArray[i];
            const card = document.createElement('div');
            card.className = 'card-akomodasi';
            card.dataset.type = data.type;
            card.dataset.price = data.price;
            card.dataset.location = data.location;
            card.dataset.stayinfo = data.stayInfo;
            card.dataset.images = data.images.join(','); // Simpan array gambar sebagai string

            card.innerHTML = `
                <div class="card-image-akomodasi">
                    <img src="${data.images[0]}" alt="${data.name}">
                </div>
                <div class="card-content-akomodasi ak-card-panel">
                    <div class="ak-panel-head">
                        <div class="left">
                            <h3 class="title-akomodasi">${data.name}</h3>
                            <div class="location-akomodasi"><i class="fa-solid fa-location-dot"></i> ${data.location}</div>
                            <div class="rating-akomodasi"><span class="stars">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</span></div>
                        </div>
<<<<<<< HEAD
                        <div class="right">
                            <div class="price-label-akomodasi">Mulai dari</div>
                            <div class="price-akomodasi">${formatPrice(data.price)}</div>
                            <div class="price-sub-akomodasi">${data.stayInfo}</div>
                        </div>
                    </div>
                    <hr class="ak-panel-hr">
                    <p>${data.desc}</p>
                    <div class="card-actions-ak">
                        <button type="button" class="ak-cta ak-book-btn" aria-label="Book Now for ${data.name}">Book Now</button>
=======
                    </div>
                    <hr class="ak-panel-hr">
                    <p>${data.desc_short || ''}</p>
                    <div class="card-actions-ak">
                        <button type="button" class="ak-cta ak-book-btn" aria-label="Pesan Sekarang for ${data.name}">Pesan Sekarang</button>
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
                    </div>
                </div>
            `;

            // Initialize image rotation for this card
            initializeAkomodasiImageRotation(card, data);
            gridDiv.appendChild(card);

            // Tambahkan event listener untuk membuka modal
            card.addEventListener('click', () => openAkomodasiDetailModal(data));

            // Wire up Book Now button (stop modal open)
            const waNumber = AKOMODASI_WHATSAPP_NUMBER;
            const priceText = formatPrice(data.price);
            const message = encodeURIComponent(`[Akomodasi] ${data.name}\nLokasi: ${data.location}\nHarga: ${priceText}\nSaya ingin memesan untuk tanggal ...`);
            const url = waNumber ? `https://wa.me/${waNumber}?text=${message}` : `https://wa.me/?text=${message}`;
            const bookBtn = card.querySelector('.ak-book-btn');
            if (bookBtn) {
                bookBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.open(url, '_blank');
                });
            }
        }
        pageDiv.appendChild(gridDiv);
        container.appendChild(pageDiv);
    }
}

function setupAkomodasiSlider() {
    const akTrack = document.getElementById('akTrack');
    const prevBtn = document.getElementById('akPrev');
    const nextBtn = document.getElementById('akNext');
    let currentPage = 0;

    // Debug logging
    console.log('Setting up akomodasi slider:', {
        akTrack: !!akTrack,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        totalPages: akTrack ? akTrack.children.length : 0
    });

    function updateSliderPosition() {
        const totalPages = akTrack.children.length;
        const firstPage = akTrack.querySelector('.ak-page');
        const pageWidth = firstPage ? firstPage.getBoundingClientRect().width : akTrack.getBoundingClientRect().width;
        const offset = -(currentPage * pageWidth);
        akTrack.style.transform = `translateX(${offset}px)`;
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
        console.log('Akomodasi next button clicked, currentPage:', currentPage);
        const totalPages = akTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
            console.log('Moved to page:', currentPage);
        }
    });

    updateSliderPosition(); // Inisialisasi posisi slider

    // Recalculate position on resize to keep the current page in view
    const onResizeRecalc = () => updateSliderPosition();
    window.addEventListener('resize', onResizeRecalc);
}

function setupAkomodasiToolbar() {
    const filterSelect = document.getElementById('filterSelect');
    const filterAllBtn = document.getElementById('filterAllBtn');
    const searchInput = document.getElementById('akomodasiSearchInput');
    const sortByPriceBtn = document.getElementById('sortByPriceBtn');

    let currentFilter = 'all';
    let currentSearchQuery = '';
    let currentSortOrder = 'asc'; // 'asc' atau 'desc'

    const applyFiltersAndSort = () => {
        let filteredData = window.akomodasiData.filter(item => {
            const matchesType = (currentFilter === 'all' || item.type === currentFilter);
            const matchesSearch = (item.name.toLowerCase().includes(currentSearchQuery) || item.desc.toLowerCase().includes(currentSearchQuery));
            return matchesType && matchesSearch;
        });

        if (currentSortOrder === 'asc') {
            filteredData.sort((a, b) => a.price - b.price);
        } else {
            filteredData.sort((a, b) => b.price - a.price);
        }

        buildAkomodasiCards(document.getElementById('akTrack'), filteredData);
        setupAkomodasiSlider(); // Reset slider setelah filter/sort
    };

    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        applyFiltersAndSort();
    });

    filterAllBtn.addEventListener('click', () => {
        filterSelect.value = 'all';
        currentFilter = 'all';
        applyFiltersAndSort();
    });

    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase();
        applyFiltersAndSort();
    });

    sortByPriceBtn.addEventListener('click', () => {
        currentSortOrder = (currentSortOrder === 'asc' ? 'desc' : 'asc');
        sortByPriceBtn.innerHTML = `<i class="fas fa-sort-amount-${currentSortOrder === 'asc' ? 'down' : 'up'}"></i> Urutkan Harga`;
        applyFiltersAndSort();
    });
}

function ensureAkomodasiModal() {
    const modal = document.getElementById('akomodasiDetailModal');
    if (!modal) return;

    const closeBtn = document.getElementById('akomodasiDetailModalCloseBtn');
    if (closeBtn) {
        // Tambahkan efek suara saat tombol ditekan (opsional)
        closeBtn.addEventListener('mousedown', () => {
            closeBtn.style.transform = 'scale(0.95)';
        });
        
        closeBtn.addEventListener('mouseup', () => {
            closeBtn.style.transform = '';
        });
        
        closeBtn.addEventListener('click', () => {
            // play close animation
            modal.classList.add('is-closing');
            const content = modal.querySelector('.modal-content');
            if (content) content.classList.add('is-closing');
            
            // clear auto-rotate if any
            if (modal.dataset.akSlideInterval) {
                try { clearInterval(Number(modal.dataset.akSlideInterval)); } catch (e) {}
                delete modal.dataset.akSlideInterval;
            }
            
            const onEnd = () => {
                modal.removeEventListener('animationend', onEnd);
                modal.classList.remove('is-closing');
                if (content) content.classList.remove('is-closing');
                closeModal();
            };
            
            modal.addEventListener('animationend', onEnd);
        });
        
        // Tambahkan akses keyboard
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeBtn.click();
            }
        });
    }

    // Prevent clicks inside content from bubbling to overlay
    const contentEl = modal.querySelector('.modal-content');
    if (contentEl) contentEl.addEventListener('click', (e) => e.stopPropagation());

    // Close on clicking outside content with guard (attach once)
    if (!modal.dataset.overlayHandlerBound) {
        modal.addEventListener('click', (e) => {
            // stop bubbling to document-level handler
            e.stopPropagation();
            if (modal.dataset && modal.dataset.openGuard === '1') return;
            if (e.target === modal && getComputedStyle(modal).display !== 'none') {
                if (modal.dataset.akSlideInterval) {
                    try { clearInterval(Number(modal.dataset.akSlideInterval)); } catch (e2) {}
                    delete modal.dataset.akSlideInterval;
                }
                closeModal();
            }
        });
        modal.dataset.overlayHandlerBound = '1';
    }
}

function openAkomodasiDetailModal(data) {
    const modal = document.getElementById('akomodasiDetailModal');
    const content = document.getElementById('akomodasiModalContent');
    if (!modal || !content) return;

    const title = data.name || 'Detail Akomodasi';
    const price = data.price || 0;
<<<<<<< HEAD
    const desc = data.desc || '';
=======
    const desc_full = data.desc_full || [];
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
    const images = data.images || [];
    const type = data.type || '';
    const location = data.location || '';
    const rating = data.rating || 0;
    const stayInfo = data.stayInfo || '1 malam, 2 dewasa';

<<<<<<< HEAD
    const facilitiesMap = {
        hotel: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Kolam Renang', icon: 'fa-swimming-pool'},
            {name: 'Restoran', icon: 'fa-utensils'},
            {name: 'Parkir', icon: 'fa-parking'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'TV Kabel', icon: 'fa-tv'},
            {name: '24 Jam Front Desk', icon: 'fa-clock'},
            {name: 'Layanan Kamar', icon: 'fa-concierge-bell'}
        ],
        villa: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Private Pool', icon: 'fa-swimming-pool'},
            {name: 'Dapur', icon: 'fa-utensils'},
            {name: 'Parkir', icon: 'fa-parking'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Teras Pribadi', icon: 'fa-umbrella-beach'},
            {name: 'BBQ Area', icon: 'fa-fire'},
            {name: 'Laundry', icon: 'fa-soap'}
        ],
        guesthouse: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Parkir', icon: 'fa-parking'},
            {name: 'Dapur Umum', icon: 'fa-utensils'},
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Air Panas', icon: 'fa-hot-tub'},
            {name: 'Taman', icon: 'fa-tree'},
            {name: 'Ruang Tamu Bersama', icon: 'fa-couch'},
            {name: 'Teras', icon: 'fa-umbrella-beach'}
        ]
    };
    const facs = facilitiesMap[type] || ['WiFi Gratis','Parkir','AC'];
=======
    // Gunakan fasilitas dari data akomodasi jika tersedia, jika tidak gunakan default berdasarkan tipe
    let facilities = data.facilities || [];
    
    // Jika fasilitas tidak tersedia, gunakan default dari facilitiesMap
    if (!facilities || facilities.length === 0) {
        const facilitiesMap = {
            hotel: [
                {name: 'WiFi Gratis', icon: 'fa-wifi'},
                {name: 'Kolam Renang', icon: 'fa-swimming-pool'},
                {name: 'Restoran', icon: 'fa-utensils'},
                {name: 'Parkir', icon: 'fa-parking'},
                {name: 'AC', icon: 'fa-snowflake'},
                {name: 'TV Kabel', icon: 'fa-tv'},
                {name: '24 Jam Front Desk', icon: 'fa-clock'},
                {name: 'Layanan Kamar', icon: 'fa-concierge-bell'}
            ],
            villa: [
                {name: 'WiFi Gratis', icon: 'fa-wifi'},
                {name: 'Private Pool', icon: 'fa-swimming-pool'},
                {name: 'Dapur', icon: 'fa-utensils'},
                {name: 'Parkir', icon: 'fa-parking'},
                {name: 'AC', icon: 'fa-snowflake'},
                {name: 'Teras Pribadi', icon: 'fa-umbrella-beach'},
                {name: 'BBQ Area', icon: 'fa-fire'},
                {name: 'Laundry', icon: 'fa-soap'}
            ],
            guesthouse: [
                {name: 'WiFi Gratis', icon: 'fa-wifi'},
                {name: 'Parkir', icon: 'fa-parking'},
                {name: 'Dapur Umum', icon: 'fa-utensils'},
                {name: 'Kipas Angin', icon: 'fa-fan'},
                {name: 'Air Panas', icon: 'fa-hot-tub'},
                {name: 'Taman', icon: 'fa-tree'},
                {name: 'Ruang Tamu Bersama', icon: 'fa-couch'},
                {name: 'Teras', icon: 'fa-umbrella-beach'}
            ]
        };
        facilities = facilitiesMap[type] || [{name: 'WiFi Gratis', icon: 'fa-wifi'}, {name: 'Parkir', icon: 'fa-parking'}, {name: 'AC', icon: 'fa-snowflake'}];
    }
    
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
    const priceText = formatPrice(price);

    content.innerHTML = `
        <div class="ak-modal">
            <div class="akc-carousel">
                <button class="akc-nav prev" id="akcPrev" aria-label="Sebelumnya">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <div class="akc-track" id="akcTrack"></div>
                <button class="akc-nav next" id="akcNext" aria-label="Berikutnya">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <div class="akc-dots" id="akcDots"></div>

            <div class="ak-simple-head">
                <div class="left">
                    <h3 class="title">${title}</h3>
                    ${location ? `<div class="location"><i class="fa-solid fa-location-dot"></i> ${location}</div>` : ''}
                    <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                </div>
<<<<<<< HEAD
                <div class="right">
                    <div class="price-label">Mulai dari</div>
                    <div class="price">${priceText}</div>
                    <div class="price-sub">${stayInfo}</div>
                </div>
=======
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
            </div>

            <hr class="ak-modal-divider" />

<<<<<<< HEAD
            <p class="ak-desc">${desc}</p>
=======
            <div class="ak-desc">
                ${desc_full.map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a

            <div class="modal-facilities" id="akomodasiFacilities">
                <h3>Fasilitas</h3>
                <div class="facilities-grid">
<<<<<<< HEAD
                    ${facs.map(f => `
=======
                    ${facilities.map(f => `
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
                        <div class="facility-item">
                            <div class="facility-icon">
                                <i class="fa-solid ${f.icon}"></i>
                            </div>
                            <div class="facility-name">${f.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

<<<<<<< HEAD
            <button id="akBookNow" class="ak-cta">Book Now</button>
=======
            <button id="akBookNow" class="ak-cta">Pesan Sekarang</button>
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        </div>
    `;

    // Build carousel slides and dots
    (function setupAkCarousel(){
        const track = content.querySelector('#akcTrack');
        const dots  = content.querySelector('#akcDots');
        const prev  = content.querySelector('#akcPrev');
        const next  = content.querySelector('#akcNext');
        if (!track || !prev || !next) return;

        track.innerHTML = '';
        dots.innerHTML  = '';

        const imgs = images.length ? images : [];
        imgs.forEach((src, idx) => {
            const slide = document.createElement('div');
            slide.className = 'akc-slide';
            slide.innerHTML = `<img src="${src}" alt="${title} ${idx+1}">`;
            track.appendChild(slide);
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.addEventListener('click', () => setIndex(idx));
            dots.appendChild(dot);
        });

        let index = 0;
        function setIndex(i){
            const total = track.children.length;
            if (!total) return;
            index = (i + total) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
            Array.from(track.children).forEach((slide, j) => slide.classList.toggle('active', j === index));
            dots.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === index));
        }

        prev.onclick = () => setIndex(index - 1);
        next.onclick = () => setIndex(index + 1);

        // Hide arrows if single image
        if (track.children.length < 2) {
            prev.style.display = 'none';
            next.style.display = 'none';
            dots.style.display = 'none';
        } else {
            prev.style.display = 'grid';
            next.style.display = 'grid';
            dots.style.display = 'flex';
        }

        setIndex(0);

        // Auto-rotate every 2s with smooth fade
        if (track.children.length > 1) {
            if (modal.dataset.akSlideInterval) {
                try { clearInterval(Number(modal.dataset.akSlideInterval)); } catch (e) {}
                delete modal.dataset.akSlideInterval;
            }
            const intervalId = setInterval(() => setIndex(index + 1), 2000);
            modal.dataset.akSlideInterval = String(intervalId);
        }
    })();

    // Animate open
    modal.style.display = 'block';
    // Guard against immediate outside-click close right after opening
    modal.dataset.openGuard = '1';
    modal.dataset.justOpenedAt = String(Date.now());
    setTimeout(() => { try { delete modal.dataset.openGuard; } catch (e) {} }, 500);
    modal.classList.remove('is-closing');
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'modalIn .35s cubic-bezier(.2,.8,.2,1) both';
    }
    document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body

    // Book Now button
<<<<<<< HEAD
    const waNumber = AKOMODASI_WHATSAPP_NUMBER;
=======
    const waNumber = data.whatsapp || AKOMODASI_WHATSAPP_NUMBER;
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
    const message = encodeURIComponent(`[Akomodasi] ${title}\nHarga: ${priceText}\nSaya ingin memesan untuk tanggal ...`);
    const url = waNumber ? `https://wa.me/${waNumber}?text=${message}` : `https://wa.me/?text=${message}`;
    document.getElementById('akBookNow')?.addEventListener('click', () => window.open(url, '_blank'));
}

// Image rotation function for akomodasi cards
function initializeAkomodasiImageRotation(card, data) {
    const cardImage = card.querySelector('.card-image-akomodasi');
    if (!cardImage || !data.images || data.images.length <= 1) return;

    // Create rotating images
<<<<<<< HEAD
    const images = data.images.slice(0, 4); // Use up to 4 images
=======
    const images = data.images; // Use all available images
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
    if (images.length < 2) return;

    // Clear existing content and add rotating images
    cardImage.innerHTML = '';

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
