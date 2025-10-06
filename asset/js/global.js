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
        name: "Villa Mandala",
        desc_short: "Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.",
        desc_full: [
            "Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.",
            "Untuk harga, tersedia beberapa pilihan sesuai kebutuhan:",
            "- Rp350.000/kamar (dengan kipas angin)",
            "- Rp500.000/kamar (dengan AC)",
            "- Paket villa mulai dari Rp750.000 - Rp1.000.000"
        ],
        img: "asset/img/wisata andalah/akomodasi/villa-mandala/01.jpeg",
        type: "villa",
        location: "Tepi Pantai Mandala",
        whatsapp: "6285256246382",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
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
        name: "Mandala Homestay",
        desc_short: "Penginapan pantai dengan suasana tenang di Villa Mandala.",
        desc_full: [
            "Villa Mandala merupakan penginapan yang terletak tepat di tepi pantai, sehingga menghadirkan suasana yang tenang dengan panorama laut yang indah.",
            "Tersedia beberapa pilihan bangunan:",
            "- Room Café: 2 kamar, full AC",
            "- Bangunan di atas kedai: 3 kamar, kipas angin",
            "- Bangunan tunggal: 1 unit 2 bed, full AC",
            "- Bangunan 3 lantai: lantai 1 & 2 masing-masing 3 kamar kipas angin, lantai 3 los dengan kipas angin",
            "Semua bangunan memiliki dapur dan kamar mandi/toilet di dalam."],
        img: "asset/img/wisata andalah/akomodasi/villa-mandala/03.jpeg",
        type: "guesthouse",
        location: "Lembanna, Bulukumba",
        whatsapp: "6281356062575",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Ruang Tamu Bersama', icon: 'fa-couch'},
            {name: 'Dapur Umum', icon: 'fa-utensils'},
            {name: 'Parkir', icon: 'fa-parking'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/mandala-homestay-1.jpg",
            "asset/img/wisata andalah/akomodasi/mandala-homestay-2.jpg",
            "asset/img/wisata andalah/akomodasi/mandala-homestay-3.jpg",
            "asset/img/wisata andalah/akomodasi/mandala-homestay-4.jpg"
        ],
        contacts: [
            { type: 'whatsapp', number: '6281356062575' },
            { type: 'whatsapp', number: '6282336414725' }
        ]
    },
    {
        name: "Villa Pajokka Beach House",
        desc_short: "Villa Pajoka menawarkan tiga kamar sewa di lantai dua dengan suasana nyaman.",
        desc_full: [
            "Villa Pajoka memiliki tiga kamar sewa yang seluruhnya berada di lantai dua.",
            "Lantai pertama digunakan oleh pemilik sehingga area tamu lebih privat.",
            "Setiap kamar dilengkapi fasilitas kipas angin dan berbagi kamar mandi di lantai pertama."],
        img: "asset/img/wisata andalah/akomodasi/villa-pajoka/01.jpeg",
        type: "villa",
        location: "Tepi Pantai Mandala",
        whatsapp: "6285653556024",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Kamar Mandi Bersama', icon: 'fa-bath'},
            {name: 'Parkir', icon: 'fa-parking'}

        ],
        bathInfo: "Kamar mandi/toilet berada di lantai pertama.",
        images: [
            "asset/img/wisata andalah/akomodasi/villa-pajokka.jpg",
            "asset/img/wisata andalah/akomodasi/villa-pajokka-2.jpg",
            "asset/img/wisata andalah/akomodasi/villa-pajokka-3.jpg"
        ]
    },
    {
        name: "SegARA Resort dan resto",
        desc_short: "Villa SegARA Resort dan resto terdiri dari dua bangunan dengan konfigurasi unik.",
        desc_full: [
            "Bangunan pertama berbentuk los tanpa sekat.",
            "Bangunan kedua memiliki satu kamar tidur nyaman untuk tamu yang menginginkan privasi.",
            "Kamar mandi/toilet tersedia di dalam area bangunan."],
        img: "asset/img/wisata andalah/akomodasi/villa-segara/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6281258849267",
        rating:5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Area Los', icon: 'fa-warehouse'},
            {name: 'Kamar Pribadi', icon: 'fa-bed'},
            {name: 'Kamar Mandi Dalam', icon: 'fa-bath'},

        ],
        images: [
            "asset/img/wisata andalah/akomodasi/Segara-Resort.jpg",
            "asset/img/wisata andalah/akomodasi/Segara-Resort-2.jpg"
        ]
    },
    {
        name: "Villa Bantilang Resort",
        desc_short: "Villa Bantilang Resort berlantai dua dengan fasilitas lengkap.",
        desc_full: [
            "Villa Bantilang Resort memiliki dua lantai dengan fasilitas lengkap.",
            "Memiliki fasilitas AC serta kamar mandi dalam untuk kenyamanan tamu."],
        img: "asset/img/wisata andalah/akomodasi/villa-bantilan/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6285257246382",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Mandi Dalam', icon: 'fa-bath'},
            {name: 'Toilet Dalam', icon: 'fa-restroom'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/bantilan-resort/Bantilan-Resort.jpg",
        ]
    },
    {
        name: "Villa Padaidi",
        desc_short: "Villa Padaidi dengan dua kamar dan kipas angin.",
        desc_full: [
            "Villa Padaidi memiliki dua kamar tidur dengan fasilitas kipas angin.",
            "Kamar mandi/toilet terletak di luar bangunan.",
            "Sangat cocok untuk tamu yang mencari penginapan sederhana namun nyaman."],
        img: "asset/img/wisata andalah/akomodasi/villa-padaidi/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6282148705597",
        rating: 4,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Area Outdoor', icon: 'fa-tree'},
            {name: 'Kamar Mandi Luar', icon: 'fa-shower'},
            {name: 'Parkir', icon: 'fa-parking'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-Padaidi.jpg"
        ]
    },
    {
        name: "Villa Paraikatte",
        desc_short: "Villa Paraikatte menawarkan kombinasi kamar kipas dan AC.",
        desc_full: [
            "Lantai satu memiliki dua kamar dengan fasilitas kipas angin.",
            "Lantai dua memiliki dua kamar dengan fasilitas AC untuk kenyamanan ekstra.",
            "Kamar mandi/toilet tersedia di dalam."],
        img: "asset/img/wisata andalah/akomodasi/villa-paraikatte/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6281523995861",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Mandi Dalam', icon: 'fa-bath'},
            {name: 'Dua Lantai', icon: 'fa-stairs'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-paraikatte/01.jpeg",
            "asset/img/wisata andalah/akomodasi/villa-paraikatte/02.jpeg"
        ]
    },
    {
        name: "Villa Sibara",
        desc_short: "Villa Sibara memiliki dua lantai dengan satu kamar besar di lantai atas.",
        desc_full: [
            "Lantai pertama dirancang sebagai area bersantai luas untuk keluarga atau kelompok.",
            "Lantai kedua menyediakan satu kamar besar dengan fasilitas full AC.",
            "Kamar mandi dan toilet tersedia di dalam dan di luar bangunan."],
        img: "asset/img/wisata andalah/akomodasi/villa-sibara/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6281355373737",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        facilities: [
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Besar', icon: 'fa-bed'},
            {name: 'Area Bersantai', icon: 'fa-couch'},
            {name: 'Kamar Mandi Dalam & Luar', icon: 'fa-bath'},
            {name: 'Dua Lantai', icon: 'fa-stairs'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-sibara.jpg",
            "asset/img/wisata andalah/akomodasi/villa-sibara-02.jpg",
            "asset/img/wisata andalah/akomodasi/villa-sibara-03.jpg"
        ]
    },
    {
        name: "Villa Sunrise",
        desc_short: "Villa Sunrise menawarkan satu kamar full AC.",
        desc_full: [
            "Villa Sunrise memiliki satu kamar dengan fasilitas full AC.",
            "Kamar mandi/toilet berada di dalam sehingga privasi terjaga."],
        img: "asset/img/wisata andalah/akomodasi/villa-sunrise/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6285340633221",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Mandi Dalam', icon: 'fa-bath'},
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-sunrise/01.jpeg"
        ]
    },
    {
        name: "Villa H. Raja Ende",
        desc_short: "Villa H. Raja Ende berlantai dua dengan empat kamar di lantai atas.",
        desc_full: [
            "Lantai pertama difungsikan sebagai area parkir untuk tamu.",
            "Lantai kedua memiliki empat kamar: dua kamar full AC dan dua kamar dengan kipas angin.",
            "Kamar mandi/toilet berada di lantai dua di luar kamar."],
        img: "asset/img/wisata andalah/akomodasi/villa-hrajaende/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6282119022072",
        rating: 5,
        stayInfo: "1 malam, 4 dewasa",
        facilities: [
            {name: 'Parkiran Lantai 1', icon: 'fa-parking'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kipas', icon: 'fa-fan'},
            {name: 'Kamar Mandi Luar Kamar', icon: 'fa-restroom'},
            {name: 'Lantai 2', icon: 'fa-stairs'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/Villa-Raja-Ende.jpeg",
        ]
    },
    {
        name: "Villa Teras Sunrise",
        desc_short: "Villa Teras Sunrise menawarkan satu kamar dengan fasilitas kipas angin.",
        desc_full: [
            "Villa Teras Sunrise memiliki satu kamar dengan fasilitas kipas angin.",
            "Kamar mandi/toilet berada di samping kamar, memudahkan akses tamu."],
        img: "asset/img/wisata andalah/akomodasi/villa-teras-sunrise/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6282396061966",
        rating: 4,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'Kamar Mandi', icon: 'fa-restroom'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/villa-teras-sunrise.jpg",
            "asset/img/wisata andalah/akomodasi/villa-teras-sunrise-02.jpg"
        ]
    },
    {
        name: "Villa H. Rusli",
        desc_short: "Villa H. Rusli memiliki dua lantai dengan satu kamar di masing-masing lantai.",
        desc_full: [
            "Lantai pertama memiliki satu kamar dengan fasilitas kipas angin.",
            "Lantai kedua memiliki satu kamar dengan fasilitas full AC.",
            "Kamar mandi/toilet tersedia di dalam dan di luar bangunan."],
        img: "asset/img/wisata andalah/akomodasi/villa-hrusli/01.jpeg",
        type: "villa",
        location: "Lembanna, Bulukumba",
        whatsapp: "6285342983932",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Mandi Dalam & Luar', icon: 'fa-bath'},
            {name: 'Dua Lantai', icon: 'fa-stairs'}
        ],
        images: [
            "asset/img/wisata andalah/akomodasi/Villa-rusli.jpeg"
        ]
    },
    {
        name: "Villa Mata Kacici",
        desc: "",
        img: "",
        type: "villa",
        location: "Lembanna, Bulukumba",
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
            "asset/img/wisata andalah/akomodasi/villa-mata-kacici.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mata-kacici-02.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mata-kacici-03.jpg"
        ]
    },
    {
        name: "Villa Mattoanging",
        desc_short: "Nikmati pengalaman menginap nyaman dengan pemandangan indah di Villa Tebing Mattoanging.",
        desc_full: ["Kami menyediakan beberapa pilihan kamar dan villa sesuai kebutuhan, mulai dari pasangan, keluarga kecil, hingga rombongan besar",
            "Standard Room I",
            "Rp350K (2=3 org) | Rp500K (2-5 org)",
            "✔ Kamar dengan AC & kamar mandi dalam",
            "Standard Room II",
            "Rp350K (2-3 org) | Rp500K (2-5 org)",
            "✔ Kamar dengan AC & kamar mandi dalam",
            "Villa Segitiga",
            "Rp1.000.000 (8-12 org)",
            "✔ 2 lantai, 1 King bed + 3 Queen bed, AC & kamar mandi dalam"
        ],
        img: "",
        type: "villa",
        location: "Tebing Mattoanging",
        whatsapp: "6285340421458",
        rating: 5,
        stayInfo: "1 malam, 2 dewasa",
        images: [
            "asset/img/wisata andalah/akomodasi/villa-mattoanging.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoanging-1.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoangin-2.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoangin-3.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoangin-4.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoangin-5.jpg",
            "asset/img/wisata andalah/akomodasi/villa-mattoangin-6.jpg",
        ],
        facilities: [
            {name: 'Kipas Angin', icon: 'fa-fan'},
            {name: 'AC', icon: 'fa-snowflake'},
            {name: 'Kamar Mandi Dalam', icon: 'fa-restroom'},
            {name: 'Dapur Umum', icon: 'fa-utensils'},
            {name: '4 WC umum', icon: 'fa-restroom'},
            {name: 'Area Pembakaran Ikan', icon: 'fa-fish fa-fire-alt'},
            {name: 'Area Camp', icon:'fa-campground'},
            {name: 'Café', icon: 'fa-utensils'},
            {name: 'Sound/Karaoke', icon: 'fa-music'},
            {name: 'Parkir', icon: 'fa-parking'},
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
        name: "Mobil Avanza",
        desc: "Mobil keluarga yang nyaman untuk perjalanan wisata",
        img: "asset/img/wisata andalah/Toyota Avanza.jpeg",
        unit: "hari"
    },
    
    {
        name: "Perahu Nelayan",
        desc: "Perahu tradisional untuk aktivitas memancing dan wisata laut",
        img: "asset2/WhatsApp Image 2025-08-20 at 12.40.15.jpeg",
        unit: "hari"
    },
    {
        name: "Mobil Innova",
        desc: "Mobil besar yang cocok untuk rombongan wisata",
        img: "asset/img/wisata andalah/Mobil innova.jpeg",
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
