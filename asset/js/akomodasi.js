// akomodasi.js
// Fungsionalitas untuk bagian Akomodasi

const AKOMODASI_WHATSAPP_NUMBER = window.AKOMODASI_WHATSAPP_NUMBER || '6281234567891'; // Ambil dari global.js

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
}

function buildAkomodasiCards(container, dataArray) {
    container.innerHTML = ''; // Bersihkan konten lama

    const cardsPerPage = 6; // 3 kolom x 2 baris
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
                        <div class="right">
                            <div class="price-label-akomodasi">Mulai dari</div>
                            <div class="price-akomodasi">${formatPrice(data.price)}</div>
                            <div class="price-sub-akomodasi">${data.stayInfo}</div>
                        </div>
                    </div>
                    <hr class="ak-panel-hr">
                    <p>${data.desc}</p>
                </div>
            `;
            gridDiv.appendChild(card);

            // Tambahkan event listener untuk membuka modal
            card.addEventListener('click', () => openAkomodasiDetailModal(data));
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

    function updateSliderPosition() {
        const totalPages = akTrack.children.length;
        akTrack.style.transform = `translateX(-${currentPage * 100}%)`;
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
        const totalPages = akTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
        }
    });

    updateSliderPosition(); // Inisialisasi posisi slider
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
        closeBtn.addEventListener('click', closeModal);
    }
}

function openAkomodasiDetailModal(data) {
    const modal = document.getElementById('akomodasiDetailModal');
    const content = document.getElementById('akomodasiModalContent');
    if (!modal || !content) return;

    const title = data.name || 'Detail Akomodasi';
    const price = data.price || 0;
    const desc = data.desc || '';
    const images = data.images || [];
    const type = data.type || '';
    const location = data.location || '';
    const rating = data.rating || 0;
    const stayInfo = data.stayInfo || '1 malam, 2 dewasa';

    const facilitiesMap = {
        hotel: ['WiFi Gratis','Kolam Renang','Restoran','Parkir','AC'],
        villa: ['WiFi Gratis','Private Pool','Dapur','Parkir','AC'],
        guesthouse: ['WiFi Gratis','Parkir','Dapur Umum','Kipas Angin','Air Panas']
    };
    const facs = facilitiesMap[type] || ['WiFi Gratis','Parkir','AC'];
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
                <div class="right">
                    <div class="price-label">Mulai dari</div>
                    <div class="price">${priceText}</div>
                    <div class="price-sub">${stayInfo}</div>
                </div>
            </div>

            <hr class="ak-modal-divider" />

            <p class="ak-desc">${desc}</p>

            <div class="modal-facilities" id="akomodasiFacilities">
                <h3>Fasilitas</h3>
                ${facs.map(f => `<div>${f}</div>`).join('')}
            </div>

            <button id="akBookNow" class="ak-cta">Book Now</button>
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
    })();

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body

    // Book Now button
    const waNumber = AKOMODASI_WHATSAPP_NUMBER;
    const message = encodeURIComponent(`[Akomodasi] ${title}\nHarga: ${priceText}\nSaya ingin memesan untuk tanggal ...`);
    const url = waNumber ? `https://wa.me/${waNumber}?text=${message}` : `https://wa.me/?text=${message}`;
    document.getElementById('akBookNow')?.addEventListener('click', () => window.open(url, '_blank'));
}
