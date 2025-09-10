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

    // Inisialisasi slider
    setupSewaSlider();

    // Inisialisasi pencarian
    bindSewaSearch();
}

function buildSewaCards(container, dataArray) {
    container.innerHTML = ''; // Bersihkan konten lama

    const cardsPerPage = 3; // Tampilkan 3 kartu per halaman (sesuaikan dengan desain)
    const totalPages = Math.ceil(dataArray.length / cardsPerPage);

    if (dataArray.length === 0) {
        container.innerHTML = '<div class="sewa-page"><div class="cards-grid-sewa" style="text-align:center; width:100%; padding:20px;">Tidak ada item sewa ditemukan.</div></div>';
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

            card.innerHTML = `
                <img src="${data.img}" alt="${data.name}" class="card-image-sewa" />
                <h3>${data.name}</h3>
                <p>Harga: ${formatPrice(data.price, data.unit)}</p>
                <p>${data.desc}</p>
                <button class="btn-pesan-sewa">Pesan</button>
            `;
            gridDiv.appendChild(card);

            // Event listener untuk tombol pesan
            card.querySelector('.btn-pesan-sewa').addEventListener('click', () => {
                openSewaWhatsapp(data);
            });
        }
        pageDiv.appendChild(gridDiv);
        container.appendChild(pageDiv);
    }
}

function setupSewaSlider() {
    const sewaTrack = document.getElementById('sewaTrack');
    const prevBtn = document.getElementById('sewaPrev');
    const nextBtn = document.getElementById('sewaNext');
    let currentPage = 0;

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
        const totalPages = sewaTrack.children.length;
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSliderPosition();
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
