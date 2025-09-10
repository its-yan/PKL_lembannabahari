// index.js
// Main entry point untuk website

document.addEventListener('DOMContentLoaded', function () {
    // Inisialisasi fungsionalitas umum (jika ada)
    // Contoh: modern bottom nav (jika ada di halaman ini)
    if (window.ModernBottomNav) {
        new ModernBottomNav();
    }

    // Inisialisasi fungsionalitas khusus halaman wisata
    if (document.body.id === 'wisata-page') { // Asumsi Anda bisa menambahkan id="wisata-page" ke body di wisata.html
        initializeWisataObjek();
        if (typeof initializeAtraksi === 'function') {
            initializeAtraksi();
        } else {
            console.error('Fungsi initializeAtraksi() tidak ditemukan!');
        }
        initializeAkomodasi();
        initializeKuliner();
        initializeSewa();

        // Event listener untuk menu navigasi wisata
        const menuWisataItems = document.querySelectorAll('.menu-wisata li a');
        menuWisataItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Hapus kelas 'active' dari semua item
                menuWisataItems.forEach(i => i.classList.remove('active'));
                // Tambahkan kelas 'active' ke item yang diklik
                this.classList.add('active');

                // Smooth scroll ke bagian yang dituju
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Sesuaikan offset jika ada fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Inisialisasi fungsionalitas profil (jika ada di halaman ini)
    // if (document.body.id === 'profil-page') { // Asumsi Anda bisa menambahkan id="profil-page" ke body di profil.html
    //     initializeProfil(); // Panggil fungsi inisialisasi dari profil.js
    // }

    // ... tambahkan inisialisasi untuk halaman lain jika diperlukan

});
