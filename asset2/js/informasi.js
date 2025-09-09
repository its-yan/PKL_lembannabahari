// ===== INFORMASI PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabNavigation();
    initNewsCarousel();
    initAgendaCards();
    initMobileMenu();
    initScrollEffects();
});

// ===== TAB NAVIGATION =====
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentSections = document.querySelectorAll('.content-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Smooth scroll to section
            document.getElementById(targetTab).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// ===== NEWS CAROUSEL =====
function initNewsCarousel() {
    const track = document.getElementById('newsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const newsCards = document.querySelectorAll('.news-card');
    
    let currentSlide = 0;
    const totalSlides = newsCards.length;
    let autoSlideInterval;
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function updateSlidePosition() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Stop CSS animation when manually controlling
        track.style.animation = 'none';
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index;
            updateSlidePosition();
            startAutoSlide();
        });
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    
    // News card clicks - open detail page
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            const newsId = card.getAttribute('data-news-id');
            openNewsDetail(newsId);
        });
    });
    
    // Start auto-slide
    startAutoSlide();
}

// ===== NEWS DETAIL HANDLER =====
function openNewsDetail(newsId) {
    // Create news detail data
    const newsData = {
        1: {
            title: 'Pembangunan Fasilitas Wisata Pantai Mandala Ria Fase II',
            date: '15 Januari 2025',
            category: 'Pembangunan',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.16.10_5e938fb9.jpg',
            content: `
                <p>Pemerintah Desa Lembanna dengan bangga mengumumkan dimulainya pembangunan Fase II fasilitas wisata di Pantai Mandala Ria. Proyek ambisius ini bertujuan untuk meningkatkan kenyamanan dan keamanan pengunjung serta memperkuat posisi Desa Lembanna sebagai destinasi wisata unggulan di Bulukumba.</p>
                
                <h3>Detail Pembangunan</h3>
                <ul>
                    <li>Pembangunan gazebo dan area istirahat baru dengan kapasitas 200 orang</li>
                    <li>Instalasi fasilitas sanitasi modern dan ramah lingkungan</li>
                    <li>Pemasangan jalur penerangan LED tenaga surya sepanjang pantai</li>
                    <li>Pembuatan jalur pedestrian dan jogging track</li>
                    <li>Area parkir yang diperluas dengan kapasitas 100 kendaraan</li>
                </ul>
                
                <p>Kepala Desa Lembanna, Bapak Ahmad Suryanto, menyatakan bahwa pembangunan ini merupakan wujud komitmen pemerintah desa untuk terus mengembangkan potensi wisata lokal sambil tetap menjaga kelestarian lingkungan.</p>
                
                <p>Proyek ini diperkirakan akan selesai dalam 3 bulan ke depan dengan total anggaran Rp 2.5 miliar yang bersumber dari APBD Kabupaten Bulukumba dan dana swadaya masyarakat.</p>
            `
        },
        2: {
            title: 'Festival Budaya Bahari Lembanna 2025',
            date: '12 Januari 2025',
            category: 'Budaya',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.16.22_adb04622.jpg',
            content: `
                <p>Desa Lembanna akan menggelar Festival Budaya Bahari yang pertama kali diselenggarakan pada tahun 2025. Festival ini merupakan upaya pelestarian tradisi maritim dan promosi wisata budaya yang unik di kawasan Sulawesi Selatan.</p>
                
                <h3>Program Acara</h3>
                <ul>
                    <li>Parade perahu tradisional Bugis-Makassar</li>
                    <li>Pertunjukan tari-tarian tradisional</li>
                    <li>Lomba kuliner hasil laut</li>
                    <li>Pameran kerajinan tangan khas bahari</li>
                    <li>Workshop pembuatan perahu mini</li>
                </ul>
                
                <p>Festival ini akan berlangsung selama 3 hari mulai tanggal 15-17 Maret 2025 di sepanjang pantai Mandala Ria. Diperkirakan akan mengundang lebih dari 5000 pengunjung dari berbagai daerah.</p>
                
                <p>Panitia festival mengajak seluruh masyarakat untuk berpartisipasi aktif dalam menyukseskan acara ini sebagai momentum memperkenalkan kekayaan budaya bahari Lembanna kepada dunia luar.</p>
            `
        },
        3: {
            title: 'Pelatihan UMKM Produk Olahan Hasil Laut',
            date: '10 Januari 2025',
            category: 'Ekonomi',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.18.00_be7aa69c.jpg',
            content: `
                <p>Program pemberdayaan ekonomi masyarakat melalui pelatihan UMKM produk olahan hasil laut telah dilaksanakan dengan antusias tinggi dari para peserta. Program ini merupakan bagian dari upaya diversifikasi ekonomi desa berbasis potensi lokal.</p>
                
                <h3>Materi Pelatihan</h3>
                <ul>
                    <li>Teknik pengolahan ikan menjadi produk bernilai tinggi</li>
                    <li>Packaging dan branding produk UMKM</li>
                    <li>Strategi pemasaran online dan offline</li>
                    <li>Manajemen keuangan usaha kecil</li>
                    <li>Sertifikasi keamanan pangan</li>
                </ul>
                
                <p>Sebanyak 50 peserta dari berbagai kelompok masyarakat mengikuti pelatihan yang difasilitasi oleh Dinas Perikanan Kabupaten Bulukumba dan Dinas Koperasi & UMKM.</p>
                
                <p>Diharapkan setelah pelatihan ini, peserta dapat mengembangkan usaha mandiri yang berkelanjutan dan meningkatkan pendapatan keluarga melalui pengolahan hasil laut lokal.</p>
            `
        },
        4: {
            title: 'Program Konservasi Terumbu Karang Lembanna',
            date: '8 Januari 2025',
            category: 'Lingkungan',
            image: 'asset2/WhatsApp Image 2025-08-20 at 07.24.48_b99a69c8.jpg',
            content: `
                <p>Inisiatif pelestarian lingkungan laut melalui program konservasi terumbu karang telah dimulai dengan melibatkan berbagai stakeholder. Program ini bertujuan untuk menjaga ekosistem laut yang menjadi daya tarik utama wisata bahari di Lembanna.</p>
                
                <h3>Kegiatan Konservasi</h3>
                <ul>
                    <li>Transplantasi terumbu karang di area yang rusak</li>
                    <li>Monitoring kualitas air laut secara berkala</li>
                    <li>Edukasi masyarakat tentang pentingnya ekosistem laut</li>
                    <li>Pembentukan kelompok pengawas lingkungan laut</li>
                    <li>Penelitian biodiversitas laut bersama universitas</li>
                </ul>
                
                <p>Kolaborasi dengan Marine Conservation Indonesia, Universitas Hasanuddin, dan komunitas diving lokal menjadikan program ini memiliki basis ilmiah yang kuat dan dukungan teknis yang memadai.</p>
                
                <p>Target program adalah rehabilitasi 5 hektar area terumbu karang dalam 2 tahun ke depan, yang diharapkan dapat meningkatkan biodiversitas laut dan daya tarik wisata diving.</p>
            `
        },
        5: {
            title: 'Perbaikan Akses Jalan Menuju Kawasan Wisata',
            date: '5 Januari 2025',
            category: 'Infrastruktur',
            image: 'asset2/WhatsApp Image 2025-08-20 at 07.25.02_2f80f3e4.jpg',
            content: `
                <p>Pembangunan dan perbaikan infrastruktur jalan menuju kawasan wisata utama di Desa Lembanna telah dimulai. Proyek ini merupakan prioritas utama dalam mendukung aksesibilitas wisatawan ke berbagai destinasi menarik di desa.</p>
                
                <h3>Scope Pekerjaan</h3>
                <ul>
                    <li>Pelebaran jalan utama sepanjang 5 km menuju pantai</li>
                    <li>Perbaikan jalan setapak menuju Tebing Mattoanging</li>
                    <li>Pemasangan guardrail di area berbahaya</li>
                    <li>Pembuatan signage dan papan informasi wisata</li>
                    <li>Penataan area parkir di setiap destinasi wisata</li>
                </ul>
                
                <p>Anggaran sebesar Rp 4.2 miliar dialokasikan untuk proyek ini yang berasal dari dana desa dan bantuan pemerintah provinsi. Pelaksanaan dikerjakan oleh kontraktor lokal untuk mendukung ekonomi masyarakat setempat.</p>
                
                <p>Dengan perbaikan akses ini, diharapkan jumlah kunjungan wisatawan dapat meningkat hingga 200% dan memberikan dampak ekonomi yang signifikan bagi masyarakat desa.</p>
            `
        }
    };
    
    // Open detail in new window
    const selectedNews = newsData[newsId];
    if (selectedNews) {
        const detailWindow = window.open('', '_self');
        detailWindow.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${selectedNews.title} - Desa Lembanna</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Inter', Arial, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                        background: #f5f5f5;
                    }
                    .container { 
                        max-width: 800px; 
                        margin: 0 auto; 
                        background: white; 
                        min-height: 100vh;
                    }
                    .header { 
                        background: linear-gradient(135deg, #133E87, #608BC1); 
                        color: white; 
                        padding: 2rem; 
                        text-align: center;
                    }
                    .header h1 { 
                        font-size: 2rem; 
                        margin-bottom: 1rem; 
                        font-weight: 700;
                    }
                    .meta { 
                        display: flex; 
                        justify-content: center; 
                        gap: 2rem; 
                        margin-bottom: 1rem;
                        font-size: 0.9rem;
                        opacity: 0.9;
                    }
                    .category { 
                        background: rgba(255,255,255,0.2); 
                        padding: 0.5rem 1rem; 
                        border-radius: 20px; 
                        font-weight: 600;
                    }
                    .content { 
                        padding: 2rem; 
                    }
                    .featured-image { 
                        width: 100%; 
                        height: 300px; 
                        object-fit: cover; 
                        border-radius: 10px; 
                        margin-bottom: 2rem;
                    }
                    .content h3 { 
                        color: #133E87; 
                        margin: 2rem 0 1rem; 
                        font-size: 1.3rem;
                    }
                    .content ul { 
                        margin: 1rem 0; 
                        padding-left: 2rem;
                    }
                    .content li { 
                        margin-bottom: 0.5rem;
                    }
                    .back-btn { 
                        display: inline-block; 
                        background: #133E87; 
                        color: white; 
                        padding: 1rem 2rem; 
                        border: none; 
                        border-radius: 25px; 
                        cursor: pointer; 
                        margin: 2rem 0;
                        text-decoration: none;
                        font-weight: 600;
                    }
                    .back-btn:hover { 
                        background: #608BC1; 
                    }
                    @media (max-width: 768px) {
                        .header { padding: 1.5rem; }
                        .header h1 { font-size: 1.5rem; }
                        .meta { flex-direction: column; gap: 1rem; }
                        .content { padding: 1.5rem; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="meta">
                            <span>📅 ${selectedNews.date}</span>
                            <span class="category">${selectedNews.category}</span>
                        </div>
                        <h1>${selectedNews.title}</h1>
                    </div>
                    <div class="content">
                        <img src="${selectedNews.image}" alt="${selectedNews.title}" class="featured-image">
                        ${selectedNews.content}
                        <button class="back-btn" onclick="window.location.href='informasi.html'">kembali</button>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
}

// ===== AGENDA CARDS =====
function initAgendaCards() {
    const agendaButtons = document.querySelectorAll('.agenda-detail-btn');
    
    agendaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const agendaId = button.getAttribute('data-agenda-id');
            openAgendaDetail(agendaId);
        });
    });
}

// ===== AGENDA DETAIL HANDLER =====
function openAgendaDetail(agendaId) {
    const agendaData = {
        1: {
            title: 'Gotong Royong Bersih Pantai',
            date: '25 Januari 2025',
            time: '08:00 - 12:00',
            location: 'Pantai Mandala Ria',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.16.10_5e938fb9.jpg',
            description: 'Kegiatan bersama masyarakat untuk menjaga kebersihan dan kelestarian pantai sebagai upaya pelestarian lingkungan wisata.',
            details: `
                <h3>Tujuan Kegiatan</h3>
                <ul>
                    <li>Menjaga kebersihan lingkungan pantai</li>
                    <li>Meningkatkan kesadaran masyarakat tentang pelestarian lingkungan</li>
                    <li>Mempersiapkan pantai untuk kunjungan wisatawan</li>
                    <li>Membangun gotong royong dan kebersamaan warga</li>
                </ul>
                
                <h3>Rundown Acara</h3>
                <ul>
                    <li><strong>08:00 - 08:30:</strong> Berkumpul dan pembagian area kerja</li>
                    <li><strong>08:30 - 10:30:</strong> Kegiatan bersih pantai</li>
                    <li><strong>10:30 - 11:00:</strong> Istirahat dan makan bersama</li>
                    <li><strong>11:00 - 11:30:</strong> Penanaman pohon pantai</li>
                    <li><strong>11:30 - 12:00:</strong> Penutupan dan evaluasi</li>
                </ul>
                
                <h3>Yang Perlu Dibawa</h3>
                <ul>
                    <li>Sarung tangan kerja</li>
                    <li>Kantong sampah</li>
                    <li>Peralatan kebersihan (sapu, cangkul kecil)</li>
                    <li>Topi dan tabir surya</li>
                    <li>Air minum</li>
                </ul>
                
                <p><strong>Koordinator:</strong> Bapak Hasan Basri (HP: 0812-3456-7890)</p>
            `
        },
        2: {
            title: 'Rapat Koordinasi BUMDes',
            date: '30 Januari 2025',
            time: '09:00 - 11:00',
            location: 'Kantor Desa',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.16.22_adb04622.jpg',
            description: 'Evaluasi dan perencanaan program BUMDes untuk pengembangan sektor pariwisata dan ekonomi kreatif desa.',
            details: `
                <h3>Agenda Rapat</h3>
                <ul>
                    <li>Laporan kinerja BUMDes tahun 2024</li>
                    <li>Evaluasi program wisata yang telah berjalan</li>
                    <li>Perencanaan program baru tahun 2025</li>
                    <li>Pembahasan kemitraan dengan pihak luar</li>
                    <li>Penganggaran dan alokasi dana</li>
                </ul>
                
                <h3>Peserta Rapat</h3>
                <ul>
                    <li>Kepala Desa dan Perangkat Desa</li>
                    <li>Pengurus dan Karyawan BUMDes</li>
                    <li>Perwakilan Karang Taruna</li>
                    <li>Tokoh Masyarakat dan PKK</li>
                    <li>Kelompok Sadar Wisata (Pokdarwis)</li>
                </ul>
                
                <h3>Output yang Diharapkan</h3>
                <ul>
                    <li>Rencana kerja BUMDes 2025</li>
                    <li>Target pendapatan dan pengembangan usaha</li>
                    <li>Strategi pemasaran produk dan jasa wisata</li>
                    <li>Rencana pelatihan dan pengembangan SDM</li>
                </ul>
                
                <p><strong>Penanggung Jawab:</strong> Direktur BUMDes - Ibu Siti Aminah</p>
            `
        },
        3: {
            title: 'Workshop Fotografi Wisata',
            date: '5 Februari 2025',
            time: '13:00 - 17:00',
            location: 'Tebing Mattoanging',
            image: 'asset2/WhatsApp Image 2025-08-19 at 20.18.00_be7aa69c.jpg',
            description: 'Pelatihan fotografi destinasi wisata untuk meningkatkan promosi dan dokumentasi keindahan alam Desa Lembanna.',
            details: `
                <h3>Materi Workshop</h3>
                <ul>
                    <li>Teknik dasar fotografi landscape</li>
                    <li>Komposisi dan pencahayaan alami</li>
                    <li>Fotografi dengan smartphone</li>
                    <li>Editing foto untuk media sosial</li>
                    <li>Storytelling melalui fotografi</li>
                </ul>
                
                <h3>Fasilitas yang Disediakan</h3>
                <ul>
                    <li>Instruktur profesional dari Makassar</li>
                    <li>Sertifikat keikutsertaan</li>
                    <li>Modul pembelajaran</li>
                    <li>Snack dan makan siang</li>
                    <li>Dokumentasi kegiatan</li>
                </ul>
                
                <h3>Persyaratan Peserta</h3>
                <ul>
                    <li>Membawa kamera atau smartphone</li>
                    <li>Usia minimal 16 tahun</li>
                    <li>Berkomitmen mengikuti seluruh rangkaian acara</li>
                    <li>Warga Desa Lembanna atau sekitarnya</li>
                </ul>
                
                <h3>Target Peserta</h3>
                <p>Maksimal 30 peserta dengan prioritas:</p>
                <ul>
                    <li>Pemuda Karang Taruna</li>
                    <li>Pelaku usaha wisata lokal</li>
                    <li>Content creator lokal</li>
                    <li>Anggota Pokdarwis</li>
                </ul>
                
                <p><strong>Pendaftaran:</strong> Hubungi Sekretariat Desa (0411-123-4567)</p>
            `
        },
        4: {
            title: 'Pelatihan Guide Wisata Lokal',
            date: '10 Februari 2025',
            time: '08:00 - 16:00',
            location: 'Balai Desa',
            image: 'asset2/WhatsApp Image 2025-08-20 at 07.24.48_b99a69c8.jpg',
            description: 'Program peningkatan kapasitas pemuda desa untuk menjadi pemandu wisata profesional dan berlisensi.',
            details: `
                <h3>Kurikulum Pelatihan</h3>
                <ul>
                    <li><strong>Sesi 1:</strong> Pengetahuan Dasar Pariwisata</li>
                    <li><strong>Sesi 2:</strong> Sejarah dan Budaya Lokal</li>
                    <li><strong>Sesi 3:</strong> Teknik Guiding dan Public Speaking</li>
                    <li><strong>Sesi 4:</strong> Bahasa Inggris Dasar untuk Guide</li>
                    <li><strong>Sesi 5:</strong> Manajemen Grup Wisatawan</li>
                    <li><strong>Sesi 6:</strong> Keselamatan dan Pertolongan Pertama</li>
                </ul>
                
                <h3>Instruktur</h3>
                <ul>
                    <li>Dinas Pariwisata Kab. Bulukumba</li>
                    <li>Asosiasi Guide Wisata Sulsel</li>
                    <li>Tokoh Adat dan Budayawan Lokal</li>
                    <li>Praktisi Pariwisata Berpengalaman</li>
                </ul>
                
                <h3>Benefit Peserta</h3>
                <ul>
                    <li>Sertifikat kompetensi guide wisata</li>
                    <li>Jaringan dengan industri pariwisata</li>
                    <li>Peluang kerja sebagai guide lokal</li>
                    <li>Kit pelatihan lengkap</li>
                    <li>Makan siang dan coffee break</li>
                </ul>
                
                <h3>Persyaratan Peserta</h3>
                <ul>
                    <li>Usia 18-35 tahun</li>
                    <li>Pendidikan minimal SMP</li>
                    <li>Komunikatif dan ramah</li>
                    <li>Berkomitmen menjadi guide lokal</li>
                    <li>Sehat jasmani dan rohani</li>
                </ul>
                
                <p><strong>Kuota:</strong> 25 peserta (seleksi berdasarkan formulir pendaftaran)</p>
                <p><strong>Biaya:</strong> GRATIS (didukung dana desa dan CSR)</p>
            `
        },
        5: {
            title: 'Festival Kuliner Bahari',
            date: '15 Februari 2025',
            time: '16:00 - 22:00',
            location: 'Area Pantai',
            image: 'asset2/WhatsApp Image 2025-08-20 at 07.25.02_2f80f3e4.jpg',
            description: 'Pameran dan festival makanan laut khas Lembanna dengan berbagai menu tradisional dan modern hasil olahan masyarakat setempat.',
            details: `
                <h3>Konsep Acara</h3>
                <p>Festival kuliner yang menampilkan kekayaan hasil laut dan kreativitas kuliner masyarakat Desa Lembanna dalam suasana pantai yang romantis dengan sunset yang memukau.</p>
                
                <h3>Menu Unggulan</h3>
                <ul>
                    <li><strong>Ikan Bakar Bumbu Rica:</strong> Ikan segar dengan bumbu khas Sulawesi</li>
                    <li><strong>Sup Konro Laut:</strong> Inovasi sup konro dengan seafood</li>
                    <li><strong>Kerang Hijau Asam Pedas:</strong> Menu favorit dengan cita rasa segar</li>
                    <li><strong>Coto Kepiting:</strong> Kreasi coto khas Makassar dengan kepiting</li>
                    <li><strong>Es Kelapa Muda Laut:</strong> Minuman segar khas pantai</li>
                </ul>
                
                <h3>Jadwal Acara</h3>
                <ul>
                    <li><strong>16:00 - 17:00:</strong> Pembukaan dan demo masak chef lokal</li>
                    <li><strong>17:00 - 19:00:</strong> Pameran dan penjualan makanan</li>
                    <li><strong>19:00 - 20:00:</strong> Lomba makan kerang dan pertunjukan musik</li>
                    <li><strong>20:00 - 21:00:</strong> Penyerahan penghargaan dan door prize</li>
                    <li><strong>21:00 - 22:00:</strong> Hiburan live music dan penutupan</li>
                </ul>
                
                <h3>Peserta dan Stand</h3>
                <ul>
                    <li>UMKM Kuliner Desa Lembanna</li>
                    <li>Kelompok Ibu-Ibu PKK</li>
                    <li>Warung-Warung Lokal</li>
                    <li>Chef Tamu dari Makassar</li>
                </ul>
                
                <p><strong>Tiket Masuk:</strong> Gratis</p>
                <p><strong>Info lebih lanjut:</strong> Instagram @desalembanna</p>
            `
        },
        6: {
            title: 'Musyawarah Desa Bulanan',
            date: '20 Februari 2025',
            time: '19:00 - 21:00',
            location: 'Masjid Raya',
            image: 'asset2/WhatsApp Image 2025-08-20 at 07.26.42_9768fd8a.jpg',
            description: 'Forum diskusi warga untuk membahas perkembangan desa, program-program baru, dan aspirasi masyarakat.',
            details: `
                <h3>Agenda Musyawarah</h3>
                <ul>
                    <li>Laporan perkembangan program desa</li>
                    <li>Evaluasi program wisata dan dampaknya</li>
                    <li>Pembahasan anggaran desa triwulan I</li>
                    <li>Usulan program pembangunan baru</li>
                    <li>Aspirasi dan keluhan masyarakat</li>
                </ul>
                
                <h3>Topik Utama Pembahasan</h3>
                <ul>
                    <li><strong>Infrastruktur:</strong> Perbaikan jalan dan fasilitas umum</li>
                    <li><strong>Pariwisata:</strong> Pengembangan destinasi dan promosi</li>
                    <li><strong>Ekonomi:</strong> Program pemberdayaan masyarakat</li>
                    <li><strong>Lingkungan:</strong> Pelestarian alam dan kebersihan</li>
                    <li><strong>Sosial:</strong> Kegiatan kemasyarakatan dan gotong royong</li>
                </ul>
                
                <h3>Peserta Musyawarah</h3>
                <ul>
                    <li>Kepala Desa dan Perangkat</li>
                    <li>BPD (Badan Permusyawaratan Desa)</li>
                    <li>RT/RW se-Desa Lembanna</li>
                    <li>Tokoh Masyarakat dan Agama</li>
                    <li>Perwakilan Organisasi Kemasyarakatan</li>
                    <li>Seluruh warga yang berminat</li>
                </ul>
                
                <h3>Aturan Musyawarah</h3>
                <ul>
                    <li>Datang tepat waktu dan berpakaian sopan</li>
                    <li>Menjaga ketertiban dan suasana kondusif</li>
                    <li>Menyampaikan aspirasi dengan santun</li>
                    <li>Menghargai pendapat orang lain</li>
                    <li>Mengikuti protokol kesehatan</li>
                </ul>
                
                <p><strong>Diharapkan:</strong> Kehadiran seluruh kepala keluarga untuk partisipasi aktif dalam pembangunan desa</p>
                <p><strong>Fasilitas:</strong> Snack ringan dan air mineral disediakan panitia</p>
            `
        }
    };
    
    const selectedAgenda = agendaData[agendaId];
    if (selectedAgenda) {
        const detailWindow = window.open('', '_self');
        detailWindow.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${selectedAgenda.title} - Agenda Desa Lembanna</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Inter', Arial, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                        background: #f5f5f5;
                    }
                    .container { 
                        max-width: 900px; 
                        margin: 0 auto; 
                        background: white; 
                        min-height: 100vh;
                    }
                    .header { 
                        background: linear-gradient(135deg, #133E87, #608BC1); 
                        color: white; 
                        padding: 2rem; 
                        position: relative;
                        overflow: hidden;
                    }
                    .header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="60" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
                        opacity: 0.3;
                    }
                    .date-badge {
                        display: inline-block;
                        background: rgba(255,255,255,0.2);
                        padding: 0.8rem 1.5rem;
                        border-radius: 25px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        position: relative;
                        z-index: 2;
                    }
                    .header h1 { 
                        font-size: 2.2rem; 
                        margin-bottom: 1rem; 
                        font-weight: 700;
                        position: relative;
                        z-index: 2;
                    }
                    .header-meta { 
                        display: flex; 
                        flex-wrap: wrap;
                        gap: 1.5rem; 
                        margin-bottom: 1rem;
                        font-size: 1rem;
                        opacity: 0.95;
                        position: relative;
                        z-index: 2;
                    }
                    .meta-item {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .description {
                        font-size: 1.1rem;
                        opacity: 0.9;
                        font-style: italic;
                        position: relative;
                        z-index: 2;
                    }
                    .content { 
                        padding: 2.5rem; 
                    }
                    .featured-image { 
                        width: 100%; 
                        height: 300px; 
                        object-fit: cover; 
                        border-radius: 15px; 
                        margin-bottom: 2rem;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    }
                    .content h3 { 
                        color: #133E87; 
                        margin: 2.5rem 0 1.2rem; 
                        font-size: 1.4rem;
                        font-weight: 700;
                        position: relative;
                    }
                    .content h3::before {
                        content: '';
                        position: absolute;
                        left: -1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 20px;
                        background: #608BC1;
                        border-radius: 2px;
                    }
                    .content ul { 
                        margin: 1.2rem 0; 
                        padding-left: 2rem;
                    }
                    .content li { 
                        margin-bottom: 0.8rem;
                        position: relative;
                    }
                    .content li strong {
                        color: #133E87;
                    }
                    .content > p {
                        margin: 1.5rem 0;
                        padding: 1.2rem;
                        background: #f8f9ff;
                        border-left: 4px solid #608BC1;
                        border-radius: 0 8px 8px 0;
                        font-weight: 500;
                    }
                    .back-btn { 
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        background: #133E87; 
                        color: white; 
                        padding: 1rem 2rem; 
                        border: none; 
                        border-radius: 25px; 
                        cursor: pointer; 
                        margin: 2rem 0;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 5px 15px rgba(19, 62, 135, 0.3);
                    }
                    .back-btn:hover { 
                        background: #608BC1; 
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(19, 62, 135, 0.4);
                    }
                    @media (max-width: 768px) {
                        .header { padding: 2rem 1.5rem; }
                        .header h1 { font-size: 1.8rem; }
                        .header-meta { flex-direction: column; gap: 1rem; }
                        .content { padding: 2rem 1.5rem; }
                        .content h3 { margin: 2rem 0 1rem; }
                        .content h3::before { left: -0.5rem; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="date-badge">📅 ${selectedAgenda.date}</div>
                        <h1>${selectedAgenda.title}</h1>
                        <div class="header-meta">
                            <div class="meta-item">
                                <span>🕐</span>
                                <span>${selectedAgenda.time}</span>
                            </div>
                            <div class="meta-item">
                                <span>📍</span>
                                <span>${selectedAgenda.location}</span>
                            </div>
                        </div>
                        <p class="description">${selectedAgenda.description}</p>
                    </div>
                    <div class="content">
                        <img src="${selectedAgenda.image}" alt="${selectedAgenda.title}" class="featured-image">
                        ${selectedAgenda.details}
                        <button class="back-btn" onclick="window.location.href='informasi.html'">
                            ← kembali
                        </button>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.info-header');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Loading animation
function showLoading() {
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.remove();
        }
    }, 3000);
}

// Error handler
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e);
    showToast('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});