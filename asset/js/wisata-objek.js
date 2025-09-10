// wisata-objek.js
// Fungsionalitas untuk bagian Objek Wisata

const wisataData = {
    'Mandala': {
        title: 'Pantai Mandala',
        location: 'Lembanabahari, Bulukumba',
        image: 'asset/img/wisata andalah/pantai-andalan-1.jpeg',
        description: 'Pantai Mandala adalah salah satu destinasi wisata unggulan di Desa Lembanna Bahari. Pantai ini menawarkan pemandangan laut yang memukau dengan pasir putih yang bersih dan air laut yang jernih. Pantai ini sangat cocok untuk berbagai aktivitas wisata bahari seperti berenang, snorkeling, dan menikmati sunset yang indah.',
        features: [
            'Pasir putih yang bersih',
            'Air laut jernih',
            'Spot sunset terbaik',
            'Area parkir luas',
            'Warung makanan lokal',
            'Toilet dan mushola'
        ],
        sejarah: 'Pantai Mandala Ria memiliki sejarah yang erat dengan Operasi Mandala dalam pembebasan Irian Barat. Pada masa itu, Mayjen Soeharto selaku Panglima Komando Mandala memesan sekitar 20 hingga 24 perahu sekoci di Desa Ara atau Lembanna yang dikenal sebagai pusat pembuatan kapal pinisi. Perahu-perahu tersebut berhasil diselesaikan masyarakat setempat dalam waktu sekitar 20 hari dan kemudian digunakan untuk mendukung operasi militer di Irian Barat. Nama “Mandala Ria” diberikan sebagai bentuk penghormatan terhadap peristiwa bersejarah ini.'
    },
    'GuaPassea': {
        title: 'Gua Passea',
        location: 'Lembanabahari, Bulukumba',
        image: 'asset/img/wisata andalah/gua-passea-1.webp',
        description: 'Gua Passea adalah gua alami yang memiliki keunikan tersendiri dengan stalaktit dan stalagmit yang indah. Gua ini menjadi daya tarik wisata alam yang menawarkan pengalaman petualangan yang menantang sekaligus edukatif tentang formasi geologi.',
        features: [
            'Formasi stalaktit dan stalagmit',
            'Suasana sejuk alami',
            'Spot foto unik',
            'Jalur trekking',
            'Pemandu wisata lokal',
            'Area istirahat'
        ], 
        sejarah: 'Gua Passea merupakan salah satu situs purbakala yang menyimpan kisah sejarah masyarakat Lembanna. Dahulu, gua ini menjadi tempat persembunyian warga ketika terjadi serangan dari suku kanibal. Nama Passea yang berarti “perih” menggambarkan penderitaan masyarakat saat itu, karena mereka mengalami kekurangan makanan dan kebutuhan hidup, bahkan sebagian ada yang meninggal di dalam gua. Di dalamnya ditemukan kerangka manusia, sisa-sisa pemakaman, serta berbagai peninggalan lain yang memperkuat nilai sejarahnya. Kini, Gua Passea menjadi lokasi penelitian yang menarik perhatian para peneliti maupun mahasiswa dari berbagai universitas di Sulawesi Selatan.'
    },
    'TebingMatto': {
        title: 'Tebing Mattoanging',
        location: 'Lembanabahari, Bulukumba',
        image: 'asset/img/wisata andalah/tebing-mattoanging.webp',
        description: 'Tebing Mattoanging menawarkan pemandangan spektakuler dari ketinggian dengan view laut lepas yang menakjubkan. Tempat ini sangat populer untuk menikmati sunrise dan sunset, serta menjadi spot favorit para fotografer dan pecinta alam.',
        features: [
            'Pemandangan laut lepas',
            'Spot sunrise dan sunset',
            'Jalur hiking menantang',
            'Area camping',
            'Spot fotografi terbaik',
            'Udara segar pegunungan'
        ], 
        sejarah: 'Tebing Mattoanging pada mulanya merupakan kawasan perkebunan masyarakat setempat. Seiring waktu, lahan ini ditinggalkan dan menjadi semacam lahan tidur yang tidak dimanfaatkan. Pada suatu masa, kawasan ini sempat direncanakan untuk dijadikan lokasi pertambangan nikel, namun rencana tersebut dibatalkan karena dikhawatirkan dapat mencemari laut yang ada di sekitarnya. Setelah itu, wilayah ini tetap menjadi aset desa hingga kemudian mulai dikembangkan kembali sejalan dengan program Desa Wisata Andalan. Pemerintah desa bersama pihak terkait membangun akses jalan beraspal dengan jalur dua sehingga kawasan Tebing Mattoanging kini lebih mudah dijangkau dan berkembang menjadi destinasi wisata alam dengan panorama laut yang indah.'
    },
    'TebingTongkarayya': {
        title: 'Tebing Tongkarayya',
        location: 'Lembanabahari, Bulukumba',
        image: 'asset/img/wisata andalah/batu-tongkarayya-1.jpg',
        description: 'Tebing Tongkarayya adalah destinasi wisata alam yang menawarkan panorama alam yang memukau. Dengan ketinggian yang cukup tinggi, pengunjung dapat menikmati pemandangan 360 derajat yang mencakup laut, hutan, dan perkampungan sekitar.',
        features: [
            'Panorama 360 derajat',
            'Ketinggian strategis',
            'Spot paragliding',
            'Area piknik keluarga',
            'Jalur pendakian',
            'Fasilitas keamanan'
        ], 
        sejarah: 'Batu Tongkarayya merupakan tebing batu dengan nama yang berasal dari bahasa lokal Tongkare yang berarti runtuh, merujuk pada tebing yang jatuh ke arah laut dan tersebar di sepanjang pantai. Kawasan ini kini menjadi salah satu daya tarik wisata Desa Andalan dan didukung dengan akses jalan beraspal yang diresmikan pada tahun 2023 sebagai bagian dari pengembangan destinasi wisata alam. Meski demikian, dalam cerita masyarakat setempat, kawasan ini dulunya merupakan lahan perkebunan warga yang lama ditinggalkan sebelum akhirnya mulai dibuka kembali untuk dikembangkan, sehingga meninggalkan jejak sejarah dan nilai budaya yang terus diwariskan hingga sekarang.'
    }
};

function initializeWisataObjek() {
    const wisataModal = document.getElementById('wisataModal');
    if (!wisataModal) {
        console.error('Wisata modal tidak ditemukan!');
        return;
    }

    // Event listener untuk setiap kartu objek wisata
    document.querySelectorAll('.wisata-section .card').forEach(card => {
        card.addEventListener('click', function() {
            const wisataKey = this.dataset.wisataKey;
            openWisataModal(wisataKey);
        });

        // Keyboard accessibility: Enter/Space triggers click
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Event listener untuk tombol close modal wisata
    const closeBtn = document.getElementById('wisataModalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Inisialisasi animasi kartu saat masuk viewport
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                setTimeout(() => {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }, index * 120);
                cardObserver.unobserve(target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.wisata-section .card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(36px)';
        card.style.transition = 'transform .6s cubic-bezier(0.22, 1, 0.36, 1), opacity .6s ease-out';
        cardObserver.observe(card);
    });
}

function openWisataModal(wisataKey) {
    const modal = document.getElementById('wisataModal');
    const data = wisataData[wisataKey];
    
    if (!data) {
        console.error('Wisata data not found for key:', wisataKey);
        return;
    }

    // Populate modal content
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalLocation').textContent = data.location;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Populate features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'modal-feature';
        featureElement.textContent = feature;
        featuresContainer.appendChild(featureElement);
    });

    // Populate sejarah
    const sejarahEl = document.getElementById('modalSejarah');
    if (sejarahEl) {
        sejarahEl.textContent = data.sejarah || '';
        sejarahEl.style.display = data.sejarah ? 'block' : 'none';
    }

    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body
    
    // Add entrance animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, 10);
}
