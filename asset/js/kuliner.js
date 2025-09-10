// kuliner.js
// Fungsionalitas untuk bagian Kuliner

const KULINER_WHATSAPP_NUMBER = window.KULINER_WHATSAPP_NUMBER || '6281234567892'; // Ambil dari global.js

function initializeKuliner() {
    const kulinerTrack = document.getElementById('kulinerTrack');
    if (!kulinerTrack) {
        console.error('Kuliner track tidak ditemukan!');
        return;
    }

    // Bangun kartu kuliner dari data dummy
    buildKulinerCards(kulinerTrack, window.kulinerData);

    // Inisialisasi slider
    setupKulinerSlider();

    // Inisialisasi pencarian
    bindKulinerSearch();
}

function buildKulinerCards(container, dataArray) {
    container.innerHTML = ''; // Bersihkan konten lama

    const cardsPerPage = 3; // Tampilkan 3 kartu per halaman
    const totalPages = Math.ceil(dataArray.length / cardsPerPage);

    if (dataArray.length === 0) {
        container.innerHTML = '<div class="kuliner-page"><div class="cards-grid-kuliner" style="text-align:center; width:100%; padding:20px;">Tidak ada kuliner ditemukan.</div></div>';
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

            card.innerHTML = `
                <img src="${data.img}" alt="${data.name}" class="card-image-kuliner"/>
                <h3>${data.name}</h3>
                <p>Harga: ${formatPrice(data.price)}</p>
                <p>${data.desc}</p>
                <button class="btn-pesan-kuliner">Pesan</button>
            `;
            gridDiv.appendChild(card);

            // Event listener untuk tombol pesan
            card.querySelector('.btn-pesan-kuliner').addEventListener('click', () => {
                openKulinerWhatsapp(data);
            });
        }
        pageDiv.appendChild(gridDiv);
        container.appendChild(pageDiv);
    }
}

function setupKulinerSlider() {
    const kulinerTrack = document.getElementById('kulinerTrack');
    const prevBtn = document.getElementById('kulinerPrev');
    const nextBtn = document.getElementById('kulinerNext');
    let currentPage = 0;

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
        const totalPages = kulinerTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
        }
    });

    updateSliderPosition(); // Inisialisasi posisi slider
}

function bindKulinerSearch() {
    const input = document.getElementById('kulinerSearchInput');
    const searchBtn = document.getElementById('kulinerSearchBtn');
    const kulinerTrack = document.getElementById('kulinerTrack');

    const performSearch = () => {
        const q = input.value.toLowerCase();
        const filteredData = window.kulinerData.filter(data => 
            data.name.toLowerCase().includes(q) || data.desc.toLowerCase().includes(q)
        );
        buildKulinerCards(kulinerTrack, filteredData);
        setupKulinerSlider(); // Reset slider
    };

    if (input) {
        input.addEventListener('input', performSearch);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
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
