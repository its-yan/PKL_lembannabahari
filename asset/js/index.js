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

// Data dummy untuk atraksi (sebaiknya dimuat dari JSON)
window.atraksiData = [
    {
        name: 'Camping Ground', price: 50000, unit: 'orang',
        img: 'asset/img/wisata andalah/camping-ground-1.jpg',
        images: [
            'asset/img/wisata andalah/camping-ground-1.jpg',
            'asset/img/wisata andalah/pantai-mandala-2.jpeg',
            'asset/img/wisata andalah/pantai-mandala-3.jpeg'
        ],
        desc: 'Mandala Camping Ground merupakan penyedia layanan lokasi berkemah yang berlokasi di kawasan Pantai Mandala Ria. Layanan ini ditujukan bagi para backpacker maupun wisatawan yang ingin menikmati pengalaman mendirikan tenda dan berkemah di tepi pantai dengan lebih mudah dan nyaman.',
        facilities: ['Area tenda pribadi', 'Toilet umum', 'Air bersih', 'Area BBQ', 'Pemandu wisata', 'Spot sunset']
    },
    {
        name: 'Wisata Gua Passea', price: 75000, unit: 'orang',
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
        img: 'asset/img/wisata andalah/atraksi-3.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-3.jpg',
            'asset/img/wisata andalah/pantai-mandala-6.webp',
            'asset/img/wisata andalah/pantai-mandala-7.webp'
        ],
        desc: 'Pengunjung dapat menikmati aktivitas snorkeling dengan menyewa perlengkapan lengkap yang telah disediakan. Selain itu, tersedia perahu yang akan mengantar langsung ke lokasi snorkeling di sekitar tebing Batu Tongkaraya, sehingga pengalaman berwisata laut menjadi lebih aman, nyaman, dan menyenangkan.',
        facilities: ['Perangkat snorkeling', 'Pemandu ahli', 'Kapal transport', 'Area ganti baju', 'Minuman segar', 'Asuransi']
    },
    {
        name: 'Banana Boat', price: 100000, unit: 'orang',
        img: 'asset/img/wisata andalah/atraksi-4.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-4.jpg',
            'asset/img/wisata andalah/pantai-mandala-5.webp'
        ],
        desc: 'Pengunjung dapat menikmati aktivitas banana boat di lokasi yang telah disediakan. Tersedia perahu dan perlengkapan banana boat yang dapat disewa untuk meningkatkan pengalaman bermain di laut lepas.',
        facilities: ['Perahu', 'Pelampung', 'Pemandu', 'Asuransi']
    },
    {
        name: 'Panjat Tebing', price: 200000, unit: 'paket',
        img: 'asset/img/wisata andalah/atraksi-5.jpg',
        images: [
            'asset/img/wisata andalah/atraksi-5.jpg',
            'asset/img/wisata andalah/tebing-mattoanging-2.webp'
        ],
        desc: 'Pengunjung dapat menikmati aktivitas panjat tebing di lokasi yang telah disediakan. Tersedia perlengkapan panjat tebing yang dapat disewa untuk meningkatkan pengalaman panjat tebing di alam terbuka.',
        facilities: ['Peralatan panjat', 'Instruktur', 'Asuransi']
    },
    {
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
        img: 'asset/img/wisata andalah/tebing-mattoanging-2.webp',
        images: [
            'asset/img/wisata andalah/tebing-mattoanging-2.webp',
            'asset/img/wisata andalah/tebing-mattoanging.webp'
        ],
        desc: 'Jelajah bukit untuk melihat panorama laut dari ketinggian.',
        facilities: ['Pemandu', 'Air mineral']
    },
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
];

// Data dummy untuk akomodasi (sebaiknya dimuat dari JSON)
window.akomodasiData = [
    {
        name: 'Hotel Mandala', type: 'hotel', price: 750000, location: 'Lembanabahari, Bulukumba', rating: 4,
        images: ['asset/img/wisata andalah/pantai-andalan-1.jpeg', 'asset/img/wisata andalah/pantai-mandala-2.jpeg', 'asset/img/wisata andalah/pantai-mandala-3.jpeg'],
        desc: 'Penginapan nyaman dekat pantai Mandala dengan fasilitas lengkap, kolam renang, dan restoran.',
        stayInfo: '1 malam, 2 dewasa'
    },
    {
        name: 'Villa Batu Tongkaraya', type: 'villa', price: 1500000, location: 'Lembanabahari, Bulukumba', rating: 5,
        images: ['asset/img/wisata andalah/tebing-mattoanging.webp', 'asset/img/wisata andalah/tebing-mattoanging-2.webp'],
        desc: 'Villa mewah dengan pemandangan laut indah, udara sejuk, dan fasilitas private pool.',
        stayInfo: '1 malam, 2 dewasa'
    },
    {
        name: 'Guest House Ria', type: 'guesthouse', price: 300000, location: 'Lembanabahari, Bulukumba', rating: 3,
        images: ['asset/img/wisata andalah/gua-passea-1.webp', 'asset/img/wisata andalah/gua-passea-2.jpg', 'asset/img/wisata andalah/gua-passea-3.jpeg'],
        desc: 'Guest house sederhana dan bersih, cocok untuk backpacker hemat dengan WiFi gratis.',
        stayInfo: '1 malam, 2 dewasa'
    },
    {
        name: 'Villa Angin Laut', type: 'villa', price: 2200000, location: 'Lembanabahari, Bulukumba', rating: 5,
        images: ['asset/img/wisata andalah/tebing-mattoanging-3.webp', 'asset/img/wisata andalah/tebing-mattoanging.webp'],
        desc: 'Villa private dengan kolam renang infinity, view laut 360°, dan butler service.',
        stayInfo: '1 malam, 2 dewasa'
    },
    {
        name: 'Guest House Melati', type: 'guesthouse', price: 450000, location: 'Lembanabahari, Bulukumba', rating: 4,
        images: ['asset/img/wisata andalah/camping-ground-1.jpg', 'asset/img/wisata andalah/pantai-mandala-7.webp'],
        desc: 'Tempat menginap keluarga dengan breakfast, playground anak, dan taman yang asri.',
        stayInfo: '1 malam, 2 dewasa'
    },
    {
        name: 'Guest House Bukit', type: 'guesthouse', price: 350000, location: 'Lembanabahari, Bulukumba', rating: 3,
        images: ['asset/img/wisata andalah/gua-passea-1.webp', 'asset/img/wisata andalah/gua-passea-2.jpg'],
        desc: 'View bukit dan udara sejuk, cocok untuk backpacker.',
        stayInfo: '1 malam, 2 dewasa'
    }
];

// Data dummy untuk kuliner (sebaiknya dimuat dari JSON)
window.kulinerData = [
    {
        name: 'Coto Makassar', price: 35000,
        img: 'asset/img/wisata andalah/kuliner-1.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Coto Makassar asli dengan bumbu rempah pilihan.'
    },
    {
        name: 'Pallubasa', price: 30000,
        img: 'asset/img/wisata andalah/kuliner-2.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Pallubasa hangat dengan kuah kental dan daging empuk.'
    },
    {
        name: 'Konro Bakar', price: 60000,
        img: 'asset/img/wisata andalah/kuliner-3.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Iga sapi bakar dengan bumbu khas Makassar.'
    },
    {
        name: 'Es Pisang Ijo', price: 15000,
        img: 'asset/img/wisata andalah/kuliner-4.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Es pisang ijo segar dengan sirup dan santan.'
    },
    {
        name: 'Mie Titi', price: 25000,
        img: 'asset/img/wisata andalah/kuliner-5.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Mie kering renyah dengan kuah kental dan topping melimpah.'
    },
    {
        name: 'Nasi Goreng Seafood', price: 40000,
        img: 'asset/img/wisata andalah/kuliner-6.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Nasi goreng dengan aneka seafood segar.'
    }
];

// Data dummy untuk sewa (sebaiknya dimuat dari JSON)
window.sewaData = [
    {
        name: 'Sewa Motor Matic', price: 75000, unit: 'hari',
        img: 'asset/img/wisata andalah/sewa-motor-1.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Sewa motor matic untuk menjelajahi desa dengan mudah.'
    },
    {
        name: 'Sewa Mobil Avanza', price: 350000, unit: 'hari',
        img: 'asset/img/wisata andalah/sewa-mobil-1.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Sewa mobil Avanza untuk perjalanan keluarga atau rombongan.'
    },
    {
        name: 'Sewa Sepeda Gunung', price: 50000, unit: 'hari',
        img: 'asset/img/wisata andalah/sewa-sepeda-1.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Sewa sepeda gunung untuk petualangan di alam bebas.'
    },
    {
        name: 'Sewa Perahu Nelayan', price: 200000, unit: 'jam',
        img: 'asset/img/wisata andalah/sewa-perahu-1.jpg', // Ganti dengan gambar yang sesuai
        desc: 'Sewa perahu nelayan untuk memancing atau berkeliling pantai.'
    }
];

// Nomor WhatsApp untuk atraksi (ganti dengan nomor tujuan)
window.ATRAKSI_WHATSAPP_NUMBER = '6281234567890';
// Nomor WhatsApp untuk akomodasi (ganti dengan nomor tujuan)
window.AKOMODASI_WHATSAPP_NUMBER = '6281234567891';
// Nomor WhatsApp untuk kuliner (ganti dengan nomor tujuan)
window.KULINER_WHATSAPP_NUMBER = '6281234567892';
// Nomor WhatsApp untuk sewa (ganti dengan nomor tujuan)
window.SEWA_WHATSAPP_NUMBER = '6281234567893';
