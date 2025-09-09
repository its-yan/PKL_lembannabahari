const mainImage = document.getElementById('mainImage');
const thumbItems = document.querySelectorAll('.thumb-item');
const zoomBtn = document.getElementById('zoomBtn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const images = Array.from(thumbItems).map(item => item.dataset.src);

function updateMainImage(src) {
    mainImage.src = src;
}
function updateLightboxImage(src) {
    lightboxImage.src = src;
}
function updateThumbnail(index) {
    thumbItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Thumbnail click handler
thumbItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        updateMainImage(images[currentImageIndex]);
        updateThumbnail(currentImageIndex);
    });
});

// Open lightbox
zoomBtn.addEventListener('click', () => {
    lightbox.classList.add('active');
    updateLightboxImage(images[currentImageIndex]);
    document.body.style.overflow = 'hidden';
    resetZoom();
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetZoom();
});

// Next/Prev
lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage(images[currentImageIndex]);
    updateThumbnail(currentImageIndex);
    resetZoom();
});
lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage(images[currentImageIndex]);
    updateThumbnail(currentImageIndex);
    resetZoom();
});

// Zoom on image click
let isZoomed = false;
function resetZoom() {
    isZoomed = false;
    lightboxImage.classList.remove('zoomed');
}
lightboxImage.addEventListener('click', () => {
    isZoomed = !isZoomed;
    if (isZoomed) {
        lightboxImage.classList.add('zoomed');
    } else {
        lightboxImage.classList.remove('zoomed');
    }
});

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetZoom();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') lightboxClose.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
    }
});
// Contact button
contactBtn.addEventListener('click', () => {
    window.open('https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk Makanan Tradisional Desa', '_blank');
});

// Mobile navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for anchor links
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

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGM0YwIi8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDMwIDEwMEMxMzAgMTE2LjU2OSAxMTYuNTY5IDEzMCAxMDAgMTMwQzgzLjQzMSAxMzAgNzAgMTE2LjU2OSA3MCAxMEM3MCA4My40MzEgODMuNDMxIDcwIDEwMCA3MFoiIGZpbGw9IiM2MDhCQzEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIyLjA5MDkgMjAgMjQgMTguMDkwOSAyNCAxNkMyNCAxMy45MDkxIDIyLjA5MDkgMTIgMjAgMTJDMTcuOTA5MSAxMiAxNiAxMy45MDkxIDE2IDE2QzE2IDE4LjA5MDkgMTcuOTA5MSAyMCAyMCAyMFoiIGZpbGw9IiMxMzNFODciLz4KPC9zdmc+Cjwvc3ZnPgo=';
        this.alt = 'Gambar tidak tersedia';
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.variant-btn, .qty-btn, .btn-primary, .btn-secondary').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }
}

// Data ringkas untuk pencarian lintas fasilitas
const fasilitasData = [
  { title: 'Pusat Informasi', url: 'fasilitas_pusat-informasi.html', keywords: ['informasi','pusat','help','bantuan'] },
  { title: 'Tempat Ibadah', url: 'fasilitas_tempat-ibadah.html', keywords: ['ibadah','masjid','gereja','mushola'] },
  { title: 'Taman Bermain', url: 'fasilitas_taman-bermain.html', keywords: ['taman','bermain','playground','anak'] },
];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function doSearch(q){
  if(!searchResults) return;
  const term = q.trim().toLowerCase();
  if(!term){ searchResults.classList.remove('active'); return; }
  const res = fasilitasData.filter(f=> f.title.toLowerCase().includes(term) || f.keywords.some(k=>k.includes(term)) );
  searchResults.innerHTML = res.length ? res.map(r=>`<div class="search-item" onclick="window.location='${r.url}'">${r.title}</div>`).join('') : '<div class="search-item">Tidak ada hasil</div>';
  searchResults.classList.add('active');
}

searchInput?.addEventListener('input', e=> doSearch(e.target.value));
searchBtn?.addEventListener('click', ()=> doSearch(searchInput.value));
document.addEventListener('click', e=>{
  if(searchResults && !searchResults.contains(e.target) && !searchInput.contains(e.target)) searchResults.classList.remove('active');
});

// Utility: set map iframe src jika ada data-loc
(function initMap(){
  const map = document.getElementById('facilityMap');
  if(!map) return;
  const gq = map.getAttribute('data-query') || 'Desa Lembanna Bahari';
  map.src = `https://www.google.com/maps?q=${encodeURIComponent(gq)}&output=embed`;
})();
