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
        name: "Mandala Homestay",
        desc_short: "Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.",
        desc_full: ["Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.", 
                   "Untuk harga, tersedia beberapa pilihan sesuai kebutuhan:",
                   "- Rp350.000/kamar (dengan kipas angin)",
                   "- Rp500.000/kamar (dengan AC)",
                   "- Paket villa mulai dari Rp750.000 - Rp1.000.000"],
        img: "",
        price: 500000,
        type: "guesthouse",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Ruang Tamu Bersama', icon: 'fa-couch'},
            {name: 'Dapur Umum', icon: 'fa-utensils'},
            {name: 'Ruang Tamu Bersama', icon: 'fa-couch'},
            {name: 'Parkir', icon: 'fa-parking'}
        ],
        images: [
            "",
            "",
            ""
        ]
    },
    {
        name: "SegARA Resort dan resto",
        desc: "",
        img: "",
        price: 150000,
        type: "resort",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Kolam Renang', icon: 'fa-swimming-pool'},
            {name: 'Restoran', icon: 'fa-utensils'},
            {name: 'Spa', icon: 'fa-spa'},
            {name: 'Pantai Pribadi', icon: 'fa-umbrella-beach'}
        ],
        images: [
            "",
            "",
            ""
        ]
    },
    {
        name: "Villa Mata Kacici",
        desc: "",
        img: "",
        price: 300000,
        type: "villa",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Private Pool', icon: 'fa-swimming-pool'},
            {name: 'Dapur', icon: 'fa-utensils'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Pemandangan Laut', icon: 'fa-water'}
        ],
        images: [
            "",
            "",
            ""
        ]
    },
    {
        name: "Villa Mandala",
       desc_short: "Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.",
        desc_full: ["Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.", 
                   "Untuk harga, tersedia beberapa pilihan sesuai kebutuhan:",
                   "- Rp350.000/kamar (dengan kipas angin)",
                   "- Rp500.000/kamar (dengan AC)",
                   "- Paket villa mulai dari Rp750.000 - Rp1.000.000"],
        img: "asset/img/wisata andalah/akomodasi/villa-mandala/01.jpeg",
        price: 350000,
        type: "villa",
        location: "Tepi pantai",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Ruang Pertemuan', icon: 'fa-couch'},
            {name: 'Akses Langsung ke Pantai', icon: 'fa-water'},
            {name: 'Café', icon: 'fa-utensils'},
            {name: 'Parkir', icon: 'fa-parking'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-mandala/01.jpeg",
            "asset/img/wisata andalah/akomodasi/villa-mandala/02.jpeg",
            "asset/img/wisata andalah/akomodasi/villa-mandala/04.jpeg",
            "asset/img/wisata andalah/akomodasi/villa-mandala/05.png",
            "asset/img/wisata andalah/akomodasi/villa-mandala/06.png"
        ]
    },
    {
        name: "Bantilang Pinisi Boatel (Boat Hotel)",
        desc: "",
        img: "",
        price: 100000,
        type: "hotel",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Pengalaman Unik', icon: 'fa-ship'},
            {name: 'Pemandangan 360°', icon: 'fa-compass'},
            {name: 'Makanan Laut', icon: 'fa-fish'},
            {name: 'Aktivitas Air', icon: 'fa-water'},
            {name: 'Sunset View', icon: 'fa-sun'}
        ],
        images: [
            " ",
            " "
        ]
    },
    {   
        name: "Villa Sibara Beach",
        desc: "",
        img: "",
        price: 400000,
        type: "villa",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Private Pool', icon: 'fa-swimming-pool'},
            {name: 'Dapur Lengkap', icon: 'fa-utensils'},
            {name: 'Karaoke', icon: 'fa-music'},
            {name: 'Teras Rooftop', icon: 'fa-home'}
        ],
        images: [
            "",
            ""
        ]
    },
    {
        name: "Pajokka Beach House",
        desc: "",
        img: "",
        price: 200000,
        type: "homestay", 
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'WiFi Gratis', icon: 'fa-wifi'},
            {name: 'Sarapan', icon: 'fa-coffee'},
            {name: 'Teras', icon: 'fa-umbrella-beach'},
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Pemandangan Pantai', icon: 'fa-water'}
        ],
        images: [
            "",
            ""
        ]
    },
    {
        name: "Villa Teras Sunrise",
        desc: "",
        img: "",
        price: 550000,
        type: "villa",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "",
            "",
            ""
        ]
    },
    {
        name: "Villa Padaidi",
        desc: "Cottage dengan pemandangan bukit dan lembah yang menawan",
        img: "asset/img/wisata andalah/pan  tai-mandala-4.jpeg",
        price: 250000,
        type: "villa",
        location: "Bukit L  embanna",
        rating: 5,
        stayInfo: "",
        images: [
            "",
            "",
            ""
        ]
    },
    {
        name: "Villa Mattoanging",
        desc: "",
        img: "",
        price: 350000,
        type: "villa",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "   ",
            "",
            ""
        ]
    },
    {
        name: "xx",
        desc: "",
        img: "",
        price: 100000,
        type: "",
        location: "",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "",
            ""
        ]
    },
    {
        name: "xxx",
        desc: " ",
        img: "",
        price: 600000,
        type: "",
            location: "",
        rating: 5,
        stayInfo: "1 malam, x dewasa",
        images: [
            "",
            ""
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
        name: "Coto Makassar",
        desc: "Sup daging sapi khas Makassar dengan bumbu rempah",
        img: "asset/img/wisata andalah/pantai-mandala-2.jpeg",
        price: 25000
    },
    {
        name: "Pisang Epe",
        desc: "Pisang yang dibakar dengan gula merah dan santan",
        img: "asset/img/wisata andalah/pantai-mandala-3.jpeg",
        price: 15000
    },
    {
        name: "Es Pisang Ijo",
        desc: "Minuman segar dengan pisang hijau dan santan",
        img: "asset/img/wisata andalah/pantai-mandala-4.jpeg",
        price: 12000
    },
    {
        name: "Nasi Kuning",
        desc: "Nasi kuning dengan lauk pauk khas Sulawesi Selatan",
        img: "asset/img/wisata andalah/pantai-mandala-5.webp",
        price: 20000
    },
    {
        name: "Sop Konro",
        desc: "Sup iga sapi dengan bumbu khas yang menggugah selera",
        img: "asset/img/wisata andalah/pantai-mandala-6.webp",
        price: 30000
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
