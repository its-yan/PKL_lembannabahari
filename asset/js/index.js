// global.js
// Fungsi-fungsi utilitas yang bisa digunakan di seluruh website

// Fungsi untuk memformat harga
function formatPrice(num, unit) {
    const n = Number(num || 0);
    const str = n.toLocaleString('id-ID');
    return `Rp ${str}${unit ? ` / ${unit}` : ''}`;
}

// Fungsi untuk menutup semua modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // Clear any slideshow interval stored on modal dataset
        if (modal && modal.dataset && modal.dataset.slideInterval) {
            try { clearInterval(Number(modal.dataset.slideInterval)); } catch (e) {}
            delete modal.dataset.slideInterval;
        }
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto'; // Kembalikan scroll body
}

// Event listener untuk tombol close pada modal
document.addEventListener('click', function(e) {
    const target = e.target;
    // Cek apakah target adalah tombol close atau elemen di dalamnya
    if (target.closest('.modal .close')) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    }
});

// Event listener untuk menutup modal saat klik di luar konten modal
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // ignore if click came from inside modal content (stopPropagation should prevent this, but double-guard)
        if (e.target && (e.target.closest && e.target.closest('.modal .modal-content'))) return;
        // ignore immediately after open to avoid open->close race
        if (modal.dataset && (modal.dataset.openGuard === '1' || (modal.dataset.justOpenedAt && (Date.now() - Number(modal.dataset.justOpenedAt) < 800)))) return;
        if (e.target === modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Event listener untuk menutup modal dengan tombol Escape
document.addEventListener('keydown', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

<<<<<<< HEAD
// Data dummy untuk atraksi (sebaiknya dimuat dari JSON)
window.atraksiData = [
    {
        name: 'Camping Ground', price: 50000, unit: 'orang',
        img: 'asset/img/wisata andalah/camping-ground-1.jpg',
        images: [
            'asset/img/wisata andalah/camping-ground-1.jpg',
            'asset/img/wisata andalah/pantai-mandala-2.jpeg',
            'asset/img/wisata andalah/pantai-mandala-3.jpeg'
=======
window.atraksiData = [
    {
        name: 'Camping Ground', price: 50000, unit: 'orang',
        img: 'asset/img/wisata andalah/Camping_ground/Camping Ground-1.jpeg',
        images: [
            'asset/img/wisata andalah/Camping_ground/Camping Ground-1.jpeg',
            'asset/img/wisata andalah/Camping_ground/Camping Ground-2.jpeg',
            'asset/img/wisata andalah/Camping_ground/Camping Ground.jpg'
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        ],
        desc: 'Mandala Camping Ground merupakan penyedia layanan lokasi berkemah yang berlokasi di kawasan Pantai Mandala Ria. Layanan ini ditujukan bagi para backpacker maupun wisatawan yang ingin menikmati pengalaman mendirikan tenda dan berkemah di tepi pantai dengan lebih mudah dan nyaman.',
        facilities: ['Area tenda pribadi', 'Toilet umum', 'Air bersih', 'Area BBQ', 'Pemandu wisata', 'Spot sunset']
    },
    {
<<<<<<< HEAD
        name: 'Wisata Gua Passea', price: 75000, unit: 'orang',
=======
        name: 'Wisata Gua Passea', price: 10000, unit: 'orang',
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        img: 'asset/img/wisata andalah/gua-passea-1.webp',
        images: [
            'asset/img/wisata andalah/gua-passea-1.webp',
            'asset/img/wisata andalah/gua-passea-2.jpg',
            'asset/img/wisata andalah/gua-passea-3.jpeg'
        ],
        desc: 'Wisata gua alami dengan formasi stalaktit dan stalagmit yang unik.',
        facilities: ['Pemandu berpengalaman', 'Helm dan lampu', 'Jalur aman', 'Spot foto unik', 'Area istirahat', 'Cerita sejarah']
    },
    {
        name: 'Snorkling', price: 150000, unit: 'paket',
<<<<<<< HEAD
        img: 'asset/img/wisata andalah/atraksi-3.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-3.jpg',
            'asset/img/wisata andalah/pantai-mandala-6.webp',
            'asset/img/wisata andalah/pantai-mandala-7.webp'
=======
        img: 'asset/img/wisata andalah/Snorkeling.jpg',
        images: [
            'asset/img/wisata andalah/Snorkeling.jpg',
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        ],
        desc: 'Pengunjung dapat menikmati aktivitas snorkeling dengan menyewa perlengkapan lengkap yang telah disediakan. Selain itu, tersedia perahu yang akan mengantar langsung ke lokasi snorkeling di sekitar tebing Batu Tongkaraya, sehingga pengalaman berwisata laut menjadi lebih aman, nyaman, dan menyenangkan.',
        facilities: ['Perangkat snorkeling', 'Pemandu ahli', 'Kapal transport', 'Area ganti baju', 'Minuman segar', 'Asuransi']
    },
    {
        name: 'Banana Boat', price: 100000, unit: 'orang',
        img: 'asset/img/wisata andalah/atraksi-4.jpg',
        images: [
<<<<<<< HEAD
            'asset/img/wisata andalah/atraksi-4.jpg',
            'asset/img/wisata andalah/pantai-mandala-5.webp'
=======
            'asset/img/wisata andalah/banana-boat.jpeg',
            'asset/img/wisata andalah/banana-boat-2.jpeg',
            'asset/img/wisata andalah/banana-boat-3.mp4',
            'asset/img/wisata andalah/banana-boat-4.mp4'
            
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        ],
        desc: 'Pengunjung dapat menikmati aktivitas banana boat di lokasi yang telah disediakan. Tersedia perahu dan perlengkapan banana boat yang dapat disewa untuk meningkatkan pengalaman bermain di laut lepas.',
        facilities: ['Perahu', 'Pelampung', 'Pemandu', 'Asuransi']
    },
    {
<<<<<<< HEAD
        name: 'Panjat Tebing', price: 200000, unit: 'paket',
        img: 'asset/img/wisata andalah/atraksi-5.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-5.jpg',
            'asset/img/wisata andalah/tebing-mattoanging-2.webp'
=======
        name: 'Panjat Tebing', price: 150000, unit: 'paket',
        img: 'asset/img/wisata andalah/Batu Tongkarayya.jpg',
        images: [
            'asset/img/wisata andalah/Batu Tongkarayya.jpg',
            'asset/img/wisata andalah/Batu Tongkarayya,2.jpg',
            'asset/img/wisata andalah/Batu Tongkarayya,3.jpg'
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        ],
        desc: 'Pengunjung dapat menikmati aktivitas panjat tebing di lokasi yang telah disediakan. Tersedia perlengkapan panjat tebing yang dapat disewa untuk meningkatkan pengalaman panjat tebing di alam terbuka.',
        facilities: ['Peralatan panjat', 'Instruktur', 'Asuransi']
    },
    {
<<<<<<< HEAD
        name: 'Mancing', price: 180000, unit: 'paket',
        img: 'asset/img/wisata andalah/atraksi-6.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-6.jpg',
            'asset/img/wisata andalah/atraksi-7.jpg',
            'asset/img/wisata andalah/atraksi-8.jpg',
            'asset/img/wisata andalah/atraksi-9.jpg'
        ],
        desc: 'Pengunjung dapat menikmati aktivitas memancing di lokasi yang telah disediakan. Tersedia perahu dan perlengkapan memancing yang dapat disewa untuk meningkatkan pengalaman memancing di laut lepas.',
        facilities: ['Perahu', 'Alat pancing', 'Umpan', 'Pemandu']
    },
    {
        name: 'Tur Perahu Tebing', price: 120000, unit: 'paket',
        img: 'asset/img/wisata andalah/pantai-mandala-6.webp',
        images: [
            'asset/img/wisata andalah/pantai-mandala-6.webp',
            'asset/img/wisata andalah/tebing-mattoanging.webp'
        ],
        desc: 'Tur perahu santai menyusuri tebing Batu Tongkaraya dengan pemandu lokal.',
        facilities: ['Pelampung', 'Pemandu', 'Foto dokumentasi']
    },
    {
        name: 'Trekking Bukit', price: 90000, unit: 'orang',
=======
        name: 'Trekking Bukit/Hutan', price: 150000, unit: 'orang',
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        img: 'asset/img/wisata andalah/tebing-mattoanging-2.webp',
        images: [
            'asset/img/wisata andalah/tebing-mattoanging-2.webp',
            'asset/img/wisata andalah/tebing-mattoanging.webp'
        ],
        desc: 'Jelajah bukit untuk melihat panorama laut dari ketinggian.',
        facilities: ['Pemandu', 'Air mineral']
    },
<<<<<<< HEAD
    {
        name: 'Jelajah Gua Mini', price: 70000, unit: 'orang',
        img: 'asset/img/wisata andalah/gua-passea-2.jpg',
        images: [
            'asset/img/wisata andalah/gua-passea-2.jpg',
            'asset/img/wisata andalah/gua-passea-1.webp'
        ],
        desc: 'Eksplorasi gua kecil yang aman untuk pemula dengan cerita sejarah lokal.',
        facilities: ['Helm', 'Senter', 'Pemandu']
    },
    {
        name: 'Sunset Boat', price: 160000, unit: 'paket',
        img: 'asset/img/wisata andalah/atraksi-8.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-8.jpg',
            'asset/img/wisata andalah/atraksi-9.jpg'
        ],
        desc: 'Perjalanan perahu sore hari untuk menikmati matahari terbenam.',
        facilities: ['Pelampung', 'Kudapan ringan']
    },
    {
        name: 'ATV Pantai', price: 200000, unit: 'paket',
        img: 'asset/img/wisata andalah/pantai-mandala-7.webp',
        images: [
            'asset/img/wisata andalah/pantai-mandala-7.webp',
            'asset/img/wisata andalah/pantai-mandala-5.webp'
        ],
        desc: 'Berkendara ATV di jalur pasir pantai dengan pendamping.',
        facilities: ['Helm', 'Instruktur', 'Asuransi']
    },
    {
        name: 'Kano Laut', price: 80000, unit: 'orang',
        img: 'asset/img/wisata andalah/atraksi-7.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-7.jpg',
            'asset/img/wisata andalah/camping-ground-1.jpg'
        ],
        desc: 'Aktivitas kano di perairan tenang sekitar pantai.',
        facilities: ['Kano', 'Pelampung', 'Pendamping']
    }
=======
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
];

// Data definitions moved to global.js to avoid conflicts

// Nomor WhatsApp untuk atraksi (ganti dengan nomor tujuan)
window.ATRAKSI_WHATSAPP_NUMBER = '6281234567890';
<<<<<<< HEAD
=======

>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
// Nomor WhatsApp untuk akomodasi (ganti dengan nomor tujuan)
window.AKOMODASI_WHATSAPP_NUMBER = '6281234567891';
// Nomor WhatsApp untuk kuliner (ganti dengan nomor tujuan)
window.KULINER_WHATSAPP_NUMBER = '6281234567892';
// Nomor WhatsApp untuk sewa (ganti dengan nomor tujuan)
window.SEWA_WHATSAPP_NUMBER = '6281234567893';
