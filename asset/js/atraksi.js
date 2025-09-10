// atraksi.js
// Fungsionalitas untuk bagian Atraksi Wisata

const ATRAKSI_WHATSAPP_NUMBER = window.ATRAKSI_WHATSAPP_NUMBER || '6281234567890'; // Ganti sesuai nomor WA Anda

// Format harga dengan satuan
function formatPrice(num, unit) {
    const n = Number(num || 0);
    const str = n.toLocaleString('id-ID');
    return `Rp ${str}${unit ? ` / ${unit}` : ''}`;
}

function initializeAtraksi() {
    const atraksiTrack = document.querySelector('.atraksi-track');
    if (!atraksiTrack) {
        console.error('Atraksi track tidak ditemukan!');
        return;
    }

    buildAtraksiCards(atraksiTrack);
    setupAtraksiSlider();
    bindAtraksiCardClicks();
    bindAtraksiSearch();
    ensureAtraksiModal();
}

function buildAtraksiCards(container) {
    container.innerHTML = ''; // Bersihkan konten lama

    const cardsPerPage = 6; // 3 kolom x 2 baris
    const totalPages = Math.ceil(window.atraksiData.length / cardsPerPage);

    for (let p = 0; p < totalPages; p++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'atraksi-page';

        const gridDiv = document.createElement('div');
        gridDiv.className = 'atraksi-grid';

        const startIndex = p * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, window.atraksiData.length);

        for (let i = startIndex; i < endIndex; i++) {
            const data = window.atraksiData[i];
            const card = document.createElement('div');
            card.className = 'atraksi-card';
            card.dataset.atraksiName = data.name;
            card.dataset.atraksiDesc = data.desc;
            card.dataset.atraksiImg = data.img;
            card.dataset.atraksiPrice = data.price;
            card.dataset.atraksiUnit = data.unit;

            card.innerHTML = `
                <img src="${data.img}" alt="${data.name}">
                <div class="atraksi-info">
                    <h3 class="atraksi-name">${data.name}</h3>
                    <p class="atraksi-description">${data.desc}</p>
                </div>
                <div class="atraksi-overlay">
                    <div class="atraksi-price">${formatPrice(data.price, data.unit)}</div>
                    <div class="atraksi-actions">
                        <button class="btn-detail">Detail</button>
                        <button class="btn-pesan">Pesan</button>
                    </div>
                </div>
            `;
            gridDiv.appendChild(card);
        }
        pageDiv.appendChild(gridDiv);
        container.appendChild(pageDiv);
    }
}

function setupAtraksiSlider() {
    const atraksiTrack = document.querySelector('.atraksi-track');
    const prevBtn = document.querySelector('.atraksi-prev');
    const nextBtn = document.querySelector('.atraksi-next');

    if (!atraksiTrack || !prevBtn || !nextBtn) {
        console.error('Elemen slider atraksi tidak ditemukan!');
        return;
    }

    const totalPages = atraksiTrack.children.length;
    let currentPage = 0;

    function updateSliderPosition() {
        atraksiTrack.style.transform = `translateX(-${currentPage * 100}%)`;
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
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
        }
    });

    updateSliderPosition();
}

function bindAtraksiCardClicks() {
    document.querySelectorAll('.atraksi-card').forEach(card => {
        // buka modal detail saat klik tombol Detail
        card.querySelector('.btn-detail')?.addEventListener('click', (e) => {
            e.stopPropagation();
            openAtraksiDetailModal(card);
        });

        // buka WhatsApp saat klik tombol Pesan
        card.querySelector('.btn-pesan')?.addEventListener('click', (e) => {
            e.stopPropagation();
            openAtraksiWhatsapp(card);
        });

        // klik kartu selain tombol juga buka detail
        card.addEventListener('click', (e) => {
            if (!(e.target instanceof HTMLElement) || !e.target.closest('.atraksi-actions')) {
                openAtraksiDetailModal(card);
            }
        });
    });
}

function ensureAtraksiModal() {
    const modal = document.getElementById('atraksiDetailModal');
    if (!modal) return;

    // Tombol Kembali
    const backBtn = document.getElementById('atraksiBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', closeModal);
    }

    // Tombol Tutup
    const closeBtn = document.getElementById('atraksiDetailModalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Tombol Pesan sekarang di modal
    const pesanBtn = document.getElementById('atraksiPesanBtn');
    if (pesanBtn) {
        pesanBtn.addEventListener('click', () => {
            const activeCardId = modal.dataset.activeCardId;
            const card = document.querySelector(`.atraksi-card[data-uid="${activeCardId}"]`);
            if (card) {
                openAtraksiWhatsapp(card);
            }
        });
    }
}

function openAtraksiDetailModal(card) {
    const modal = document.getElementById('atraksiDetailModal');
    if (!modal) return;

    const title = card.dataset.atraksiName || '';
    const desc = card.dataset.atraksiDesc || '';
    const price = card.dataset.atraksiPrice || 0;
    const unit = card.dataset.atraksiUnit || '';

    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-location').textContent = 'Lembanabahari, Bulukumba';
    modal.querySelector('.modal-description').textContent = desc;
    modal.querySelector('#atraksiOpeningHours').textContent = '08:00 - 18:00';
    modal.querySelector('#atraksiPrice').textContent = formatPrice(price, unit);

    // Gambar utama dan grid thumbnail
    const data = window.atraksiData.find(a => a.name.toLowerCase() === title.toLowerCase());
    const images = (data?.images && data.images.length) ? data.images : [card.dataset.atraksiImg].filter(Boolean);

    const mainImage = modal.querySelector('.main-image');
    const imageGridContainer = modal.querySelector('.image-grid');
    imageGridContainer.innerHTML = '';

    if (images.length > 0) {
        mainImage.src = images[0];
        mainImage.alt = title + ' - Main Image';
    } else {
        mainImage.src = '';
        mainImage.alt = 'Main Atraksi Image';
    }

    images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${title} image ${idx + 1}`;
        img.className = 'grid-image';
        img.loading = 'lazy';
        img.addEventListener('click', () => {
            mainImage.src = src;
            mainImage.alt = `${title} image ${idx + 1}`;
            imageGridContainer.querySelectorAll('.grid-image').forEach(thumb => thumb.classList.remove('active'));
            img.classList.add('active');
        });
        imageGridContainer.appendChild(img);
    });

    // Set thumbnail pertama aktif
    const firstThumbnail = imageGridContainer.querySelector('.grid-image');
    if (firstThumbnail) firstThumbnail.classList.add('active');

    // Fasilitas
    const facilitiesContainer = modal.querySelector('#atraksiFacilities');
    facilitiesContainer.innerHTML = '';
    if (data && data.facilities && data.facilities.length) {
        data.facilities.forEach(facility => {
            const div = document.createElement('div');
            div.textContent = facility;
            facilitiesContainer.appendChild(div);
        });
    }

    // Tandai kartu aktif untuk tombol pesan
    const uid = Math.random().toString(36).slice(2);
    card.dataset.uid = uid;
    modal.dataset.activeCardId = uid;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function openAtraksiWhatsapp(card) {
    const name = card.dataset.atraksiName || 'Atraksi';
    const price = formatPrice(card.dataset.atraksiPrice, card.dataset.atraksiUnit);
    const text = encodeURIComponent(
        `Halo, saya ingin memesan:\n- Atraksi: ${name}\n- Harga: ${price}\n\nMohon info ketersediaan pada tanggal ...`
    );
    const waUrl = `https://wa.me/${ATRAKSI_WHATSAPP_NUMBER}?text=${text}`;
    window.open(waUrl, '_blank');
}

function bindAtraksiSearch() {
    const input = document.getElementById('atraksiSearchInput');
    const searchBtn = document.getElementById('atraksiSearchBtn');
    const atraksiTrack = document.querySelector('.atraksi-track');

    if (!input || !searchBtn || !atraksiTrack) return;

    const performSearch = () => {
        const q = input.value.toLowerCase();
        const filteredData = window.atraksiData.filter(data =>
            data.name.toLowerCase().includes(q) || data.desc.toLowerCase().includes(q)
        );

        if (filteredData.length === 0) {
            atraksiTrack.innerHTML = '<div style="text-align:center; width:100%; padding:20px; color:var(--light-color);">Tidak ada atraksi ditemukan.</div>';
            document.querySelector('.atraksi-prev').disabled = true;
            document.querySelector('.atraksi-next').disabled = true;
            return;
        }

        // Bangun ulang kartu atraksi yang difilter
        container = atraksiTrack;
        container.innerHTML = '';

        const cardsPerPage = 6;
        const totalPages = Math.ceil(filteredData.length / cardsPerPage);

        for (let p = 0; p < totalPages; p++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'atraksi-page';

            const gridDiv = document.createElement('div');
            gridDiv.className = 'atraksi-grid';

            const startIndex = p * cardsPerPage;
            const endIndex = Math.min(startIndex + cardsPerPage, filteredData.length);

            for (let i = startIndex; i < endIndex; i++) {
                const data = filteredData[i];
                const card = document.createElement('div');
                card.className = 'atraksi-card';
                card.dataset.atraksiName = data.name;
                card.dataset.atraksiDesc = data.desc;
                card.dataset.atraksiImg = data.img;
                card.dataset.atraksiPrice = data.price;
                card.dataset.atraksiUnit = data.unit;

                card.innerHTML = `
                    <img src="${data.img}" alt="${data.name}">
                    <div class="atraksi-info">
                        <h3 class="atraksi-name">${data.name}</h3>
                        <p class="atraksi-description">${data.desc}</p>
                    </div>
                    <div class="atraksi-overlay">
                        <div class="atraksi-price">${formatPrice(data.price, data.unit)}</div>
                        <div class="atraksi-actions">
                            <button class="btn-detail">Detail</button>
                            <button class="btn-pesan">Pesan</button>
                        </div>
                    </div>
                `;
                gridDiv.appendChild(card);
            }
            pageDiv.appendChild(gridDiv);
            container.appendChild(pageDiv);
        }

        bindAtraksiCardClicks();
        setupAtraksiSlider();
    };

    input.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
}
