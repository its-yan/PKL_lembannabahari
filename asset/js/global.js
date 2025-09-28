// global.js
// Global data and utility functions

// Format harga dengan satuan
function formatPrice(num, unit) {
    const n = Number(num || 0);
    const str = n.toLocaleString('id-ID');
    return `Rp ${str}${unit ? ` / ${unit}` : ''}`;
}

// Data untuk Atraksi Wisata
window.atraksiData = [
    {
        name: "Snorkeling",
        desc: "Jelajahi keindahan bawah laut dengan pemandangan terumbu karang yang menakjubkan",
        img: "asset/img/wisata andalah",
        price: 50000,
        unit: "orang",
        images: [
            "asset/img/wisata andalah/Snorkeling.jpg",
        ],
        facilities: ["Perlengkapan snorkeling", "Pemandu profesional", "Asuransi", "Makan siang"]
    },
    {
        name: "Diving",
        desc: "Pengalaman menyelam yang mendalam untuk melihat kehidupan laut yang beragam",
        img: "asset/img/wisata andalah/pantai-mandala-4.jpeg",
        price: 150000,
        unit: "orang",
        images: [
            "asset/img/wisata andalah/pantai-mandala-4.jpeg",
            "asset/img/wisata andalah/pantai-mandala-5.webp",
            "asset/img/wisata andalah/pantai-mandala-6.webp"
        ],
        facilities: ["Perlengkapan diving lengkap", "Pemandu bersertifikat", "Asuransi", "Transportasi"]
    },
    {
        name: "Fishing",
        desc: "Aktivitas memancing tradisional dengan perahu nelayan lokal",
        img: "asset/img/wisata andalah/pantai-mandala-7.webp",
        price: 75000,
        unit: "orang",
        images: [
            "asset/img/wisata andalah/pantai-mandala-7.webp",
            "asset/img/wisata andalah/pantai-andalan-1.jpeg",
            "asset/img/wisata andalah/pantai-mandala-2.jpeg"
        ],
        facilities: ["Perahu nelayan", "Perlengkapan memancing", "Pemandu lokal", "Hasil tangkapan"]
    },
    {
        name: "Sunset Cruise",
        desc: "Berlayar menikmati sunset sambil menikmati pemandangan pantai yang indah",
        img: "asset/img/wisata andalah/pantai-andalan-1.jpeg",
        price: 100000,
        unit: "orang",
        images: [
            "asset/img/wisata andalah/pantai-andalan-1.jpeg",
            "asset/img/wisata andalah/pantai-mandala-2.jpeg"
        ],
        facilities: ["Perahu wisata", "Minuman segar", "Pemandu", "Fasilitas foto"]
    },
    {
        name: "Beach Volleyball",
        desc: "Aktivitas olahraga pantai yang menyenangkan untuk kelompok",
        img: "asset/img/wisata andalah/pantai-mandala-3.jpeg",
        price: 25000,
        unit: "jam",
        images: [
            "asset/img/wisata andalah/pantai-mandala-3.jpeg",
            "asset/img/wisata andalah/pantai-mandala-4.jpeg"
        ],
        facilities: ["Lapangan voli", "Net dan bola", "Wasit", "Area istirahat"]
    },
    {
        name: "Kayaking",
        desc: "Mendayung kayak mengelilingi perairan pantai yang tenang",
        img: "asset/img/wisata andalah/pantai-mandala-5.webp",
        price: 60000,
        unit: "jam",
        images: [
            "asset/img/wisata andalah/pantai-mandala-5.webp",
            "asset/img/wisata andalah/pantai-mandala-6.webp"
        ],
        facilities: ["Kayak dan dayung", "Pelampung", "Pemandu", "Asuransi"]
    }
];

// Data untuk Akomodasi
window.akomodasiData = [
    {
        name: "Villa Mandala Ria",
        desc: "Villa mewah dengan pemandangan laut langsung dan fasilitas lengkap",
        img: "asset/img/wisata andalah/pantai-andalan-1.jpeg",
        price: 500000,
        type: "villa",
        location: "Pantai Mandala",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        images: [
            "asset/img/wisata andalah/pantai-andalan-1.jpeg",
            "asset/img/wisata andalah/pantai-mandala-2.jpeg",
            "asset/img/wisata andalah/pantai-mandala-3.jpeg"
        ]
    },
    {
        name: "Homestay Lembanna",
        desc: "Penginapan nyaman dengan suasana lokal yang autentik",
        img: "asset/img/wisata andalah/pantai-mandala-4.jpeg",
        price: 150000,
        type: "guesthouse",
        location: "Desa Lembanna",
        rating: 4,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "asset/img/wisata andalah/pantai-mandala-4.jpeg",
            "asset/img/wisata andalah/pantai-mandala-5.webp",
            "asset/img/wisata andalah/pantai-mandala-6.webp"
        ]
    },
    {
        name: "Resort Pantai Andalan",
        desc: "Resort dengan kolam renang dan akses langsung ke pantai",
        img: "asset/img/wisata andalah/pantai-mandala-7.webp",
        price: 300000,
        type: "villa",
        location: "Pantai Andalan",
        rating: 4,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "asset/img/wisata andalah/pantai-mandala-7.webp",
            "asset/img/wisata andalah/pantai-andalan-1.jpeg",
            "asset/img/wisata andalah/pantai-mandala-2.jpeg"
        ]
    },
    {
        name: "Guesthouse Passea",
        desc: "Penginapan sederhana dekat dengan Gua Passea",
        img: "asset/img/wisata andalah/gua-passea-1.webp",
        price: 100000,
        type: "guesthouse",
        location: "Dekat Gua Passea",
        rating: 3,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "asset/img/wisata andalah/gua-passea-1.webp",
            "asset/img/wisata andalah/gua-passea-2.jpg"
        ]
    },
    {
        name: "Villa Tebing Mattoanging",
        desc: "Villa dengan pemandangan tebing dan laut yang spektakuler",
        img: "asset/img/wisata andalah/tebing-mattoanging.webp",
        price: 400000,
        type: "villa",
        location: "Tebing Mattoanging",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        images: [
            "asset/img/wisata andalah/tebing-mattoanging.webp",
            "asset/img/wisata andalah/tebing-mattoanging-2.webp"
        ]
    },
    {
        name: "Bungalow Tongkarayya",
        desc: "Bungalow nyaman dengan pemandangan alam yang menakjubkan",
        img: "asset/img/wisata andalah/batu-tongkarayya-1.jpg",
        price: 200000,
        type: "guesthouse",
        location: "Tebing Tongkarayya",
        rating: 4,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "asset/img/wisata andalah/batu-tongkarayya-1.jpg",
            "asset/img/wisata andalah/camping-ground-1.jpg"
        ]
    }
];

// Data untuk Kuliner
window.kulinerData = [
    {
        name: "Ikan Bakar Mandala",
        desc: "Ikan segar yang dibakar dengan bumbu khas lokal",
        img: "asset/img/wisata andalah/pantai-andalan-1.jpeg",
        price: 45000
    },
    {
        name: "Kopi ",
        desc: "Kopi khas Makassar yang disajikan dengan cara tradisional",
        img: "asset/img/wisata andalah/pantai-mandala-2.jpeg",
        price: 5000 - 10000
    },
    {
        name: "Pisang kering",
        desc: "Pisang yang dikeringkan dengan gula merah dan digoreng",
        img: "asset3/IMG/UMKM Andalan/WhatsApp Image 2025-08-24 at 12.06.48 PM.jpeg",
        price: 10000
    }

];

// Data untuk Sewa
window.sewaData = [
    {
        name: "Motor Honda Beat",
        desc: "Motor matic yang nyaman untuk berkeliling wisata",
        img: "asset/img/wisata andalah/Motor Beat.jpeg",
        price: 75000,
        unit: "hari"
    },
    {
        name: "Mobil Avanza",
        desc: "Mobil keluarga yang nyaman untuk perjalanan wisata",
        img: "asset/img/wisata andalah/Toyota Avanza.jpeg",
        price: 300000,
        unit: "hari"
    },
    {
        name: "Sepeda Gunung",
        desc: "Sepeda untuk menjelajahi jalur off-road dan pantai",
        img: "asset/img/wisata andalah/Motor gunung.jpeg",
        price: 50000,
        unit: "hari"
    },
    {
        name: "Perahu Nelayan",
        desc: "Perahu tradisional untuk aktivitas memancing dan wisata laut",
        img: "asset2/WhatsApp Image 2025-08-20 at 12.40.15.jpeg",
        price: 200000,
        unit: "hari"
    },
    {
        name: "Motor Scoopy",
        desc: "Motor retro yang stylish untuk berkeliling",
        img: "asset/img/wisata andalah/Motor scoopy.jpeg",
        price: 80000,
        unit: "hari"
    },
    {
        name: "Mobil Innova",
        desc: "Mobil besar yang cocok untuk rombongan wisata",
        img: "asset/img/wisata andalah/Mobil innova.jpeg",
        price: 400000,
        unit: "hari"
    }
];

// WhatsApp numbers
window.ATRAKSI_WHATSAPP_NUMBER = '6281234567890';
window.AKOMODASI_WHATSAPP_NUMBER = '6281234567891';
window.KULINER_WHATSAPP_NUMBER = '6281234567892';
window.SEWA_WHATSAPP_NUMBER = '6281234567893';

// Global initialization function
function initWisata() {
    console.log('Initializing wisata page...');
    
    // Initialize all sections
    if (typeof initializeWisataObjek === 'function') {
        initializeWisataObjek();
    }
    
    if (typeof initializeAtraksi === 'function') {
        initializeAtraksi();
    }
    
    if (typeof initializeAkomodasi === 'function') {
        initializeAkomodasi();
    }
    
    if (typeof initializeKuliner === 'function') {
        initializeKuliner();
    }
    
    if (typeof initializeSewa === 'function') {
        initializeSewa();
    }
    
    console.log('Wisata page initialized successfully');
}
