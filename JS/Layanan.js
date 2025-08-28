// Data untuk search functionality
const searchData = [
    {
        title: "Makanan Tradisional",
        description: "Kuliner tradisional desa yang lezat dan autentik",
        category: "produk",
        url: "umkm_snack.html",
        keywords: ["makanan", "tradisional", "kuliner", "desa", "lezat", "autentik"]
    },
    {
        title: "Kerajinan Tangan",
        description: "Kerajinan tangan unik dan berkualitas tinggi",
        category: "produk",
        url: "#",
        keywords: ["kerajinan", "tangan", "unik", "berkualitas", "seni"]
    },
    {
        title: "Makanan Ringan",
        description: "Cemilan sehat dan lezat untuk menemani aktivitas",
        category: "produk",
        url: "#",
        keywords: ["makanan", "ringan", "cemilan", "sehat", "lezat"]
    },
    {
        title: "Pusat Informasi",
        description: "Pusat informasi wisata untuk membantu perencanaan perjalanan",
        category: "fasilitas",
        url: "pusat-informasi.html",
        keywords: ["pusat", "informasi", "wisata", "perjalanan", "bantuan"]
    },
    {
        title: "Tempat Ibadah",
        description: "Fasilitas ibadah yang nyaman untuk warga dan pengunjung",
        category: "fasilitas",
        url: "#",
        keywords: ["tempat", "ibadah", "fasilitas", "nyaman", "warga", "pengunjung"]
    },
    {
        title: "Taman Bermain",
        description: "Area bermain yang aman dan menyenangkan untuk anak-anak",
        category: "fasilitas",
        url: "#",
        keywords: ["taman", "bermain", "area", "aman", "menyenangkan", "anak"]
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const headerBtns = document.querySelectorAll('.header-btn');
const contentSections = document.querySelectorAll('.content-section');
const headerScroll = document.querySelector('.header-scroll');

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        searchResults.classList.remove('active');
        return;
    }

    const results = searchData.filter(item => {
        const searchTerm = query.toLowerCase();
        return item.title.toLowerCase().includes(searchTerm) ||
               item.description.toLowerCase().includes(searchTerm) ||
               item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <p>Tidak ada hasil ditemukan</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" onclick="navigateTo('${item.url}')">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <small>Kategori: ${item.category === 'produk' ? 'Produk UMKM' : 'Fasilitas Umum'}</small>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('active');
}

function navigateTo(url) {
    if (url !== '#') {
        window.location.href = url;
    }
    searchResults.classList.remove('active');
    searchInput.value = '';
}

// Tab switching functionality
function switchTab(tabName) {
    // Update header buttons
    headerBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update content sections
    contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${tabName}-content`) {
            section.classList.add('active');
        }
    });
}

// Mobile navigation
function toggleMobileMenu() {
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
}

// Smooth scroll to content
function scrollToContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Tab switching
    headerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Mobile navigation
    navToggle.addEventListener('click', toggleMobileMenu);

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

    // Smooth scroll
    headerScroll.addEventListener('click', scrollToContent);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Product card hover effects
    document.querySelectorAll('.product-card, .facility-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation for search
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const firstResult = searchResults.querySelector('.search-result-item');
        if (firstResult) {
            firstResult.click();
        }
    }
    
    if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        searchInput.blur();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .facility-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add smooth scrolling for all internal links
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

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGM0YwIi8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDMwIDEwMEMxMzAgMTE2LjU2OSAxMTYuNTY5IDEzMCAxMDAgMTMwQzgzLjQzMSAxMzAgNzAgMTE2LjU2OSA3MCAxMEM3MCA4My40MzEgODMuNDMxIDcwIDEwMCA3MFoiIGZpbGw9IiM2MDhCQzEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIyLjA5MDkgMjAgMjQgMTguMDkwOSAyNCAxNkMyNCAxMy45MDkxIDIyLjA5MDkgMTIgMjAgMTJDMTcuOTA5MSAxMiAxNiAxMy45MDkxIDE2IDE2QzE2IDE4LjA5MDkgMTcuOTA5MSAyMCAyMCAyMFoiIGZpbGw9IiMxMzNFODciLz4KPC9zdmc+Cjwvc3ZnPgo=';
        this.alt = 'Gambar tidak tersedia';
    });
});