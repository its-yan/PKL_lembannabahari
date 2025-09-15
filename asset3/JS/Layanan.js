
// (Removed duplicated navbar block — single consolidated navbar module exists later in this file)

// Show waves when in view (optional: fade in on scroll)
document.addEventListener('DOMContentLoaded', function () {
    var waves = document.querySelector('.cta-waves');
    if (!waves) return;
    function showWaves() {
        var rect = waves.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            waves.classList.remove('hide');
        } else {
            waves.classList.add('hide');
        }
    }
    showWaves();
    window.addEventListener('scroll', showWaves);
});
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

// DOM Elements (may be absent on this page; always guard usage)
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
// navToggle/navMenu (legacy selectors) removed - consolidated navbar module at bottom handles navigation
const headerBtns = document.querySelectorAll('.header-btn');
const contentSections = document.querySelectorAll('.content-section');
const headerScroll = document.querySelector('.scroll-indicator');

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        searchResults && searchResults.classList.remove('active');
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
    
    searchResults && searchResults.classList.add('active');
}

function navigateTo(url) {
    if (url !== '#') {
        window.location.href = url;
    }
    searchResults && searchResults.classList.remove('active');
    if (searchInput) searchInput.value = '';
}

// Tab switching functionality
function switchTab(tabName) {
    // Update header buttons
    headerBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        }
        else {
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    // Update content sections
    contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${tabName}-content`) {
            section.classList.add('active');
            // focus heading for accessibility if exists
            const h2 = section.querySelector('h2');
            if (h2) h2.setAttribute('tabindex','-1');
            if (h2) h2.focus({preventScroll:true});
        }
    });
}

// legacy mobile menu toggle removed

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
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (searchInput && searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Tab switching
    if (headerBtns.length) {
        headerBtns.forEach(btn => {
            btn.setAttribute('role','button');
            btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
            btn.addEventListener('click', () => {
                switchTab(btn.dataset.tab);
                // smooth scroll to content after switch
                const mainContent = document.querySelector('.main-content');
                if (mainContent) mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    // Mobile navigation is handled by the consolidated navbar module at the end of this file

    // Smooth scroll
    if (headerScroll) {
        headerScroll.addEventListener('click', scrollToContent);
    }

    // Navbar scroll effect (guard when `.navbar` not present)
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return; // Layanan page uses .nav-wrapper instead
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
searchInput && searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const firstResult = searchResults ? searchResults.querySelector('.search-result-item') : null;
        if (firstResult) {
            firstResult.click();
        }
    }
    
    if (e.key === 'Escape') {
        if (searchResults) searchResults.classList.remove('active');
        if (searchInput) searchInput.blur();
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

// Navbar module (ported from global script), scoped and safe-guarded
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (!hamburger || !navLinks) return;

    // Ensure overlay exists
    let navOverlay = document.getElementById('navOverlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.id = 'navOverlay';
        document.body.appendChild(navOverlay);
    }

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        navOverlay.classList.toggle('show', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        navLinks.setAttribute('aria-hidden', String(!isOpen));
    }

    function closeMenu() {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
        document.body.classList.remove('menu-open');
        navOverlay.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }

    // ARIA init (match index)
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-controls', 'primary-navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.id = navLinks.id || 'primary-navigation';
    navLinks.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    navOverlay.addEventListener('click', closeMenu);

    // Close menu with Escape key and restore focus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navLinks.classList.contains('nav-active')) {
                closeMenu();
                if (hamburger) hamburger.focus();
            }
        }
    });

    // Close on resize > tablet
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });

    // Smooth scroll for internal anchors and close after click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
            closeMenu();
        });
    });

    // Sticky nav based on scroll direction with rAF throttling
    const headerContainer = document.querySelector('.header-container') || document.querySelector('.header');
    let lastScrollY = window.scrollY || 0;
    let ticking = false;
    let lockMid = false; // whether nav is currently locked at mid
    const UP_LOCK_THRESHOLD = 80; // px of upward scroll required to trigger mid-lock
    const DOWN_RELEASE_THRESHOLD = 40; // px of downward scroll required to release lock
    let lastDirectionChangeY = lastScrollY;
    let lastLockY = null; // store scrollY when lock engaged

    const shouldBeSticky = () => {
        const headerHeight = headerContainer ? headerContainer.offsetHeight : 0;
        return window.scrollY > Math.max(10, headerHeight - 80);
    };

    const mainContent = document.querySelector('.main-content');

    function positionNavMid() {
        if (!headerContainer || !mainContent || !navWrapper) return false;
        const headerRect = headerContainer.getBoundingClientRect();
        const mainRect = mainContent.getBoundingClientRect();
        // midpoint in viewport coordinates
        const midViewport = headerRect.bottom + (mainRect.top - headerRect.bottom) / 2;
        // apply
        navWrapper.classList.remove('nav-sticky');
        navWrapper.classList.add('nav-mid');
        navWrapper.style.top = `${Math.max(48, midViewport)}px`;
        // center transform to keep vertical centering of the nav element
        navWrapper.style.transform = 'translate(-50%, -50%)';
        // ensure spacer exists to keep page flow and create permanent space
        let navSpacer = document.getElementById('navSpacer');
        if (!navSpacer) {
            navSpacer = document.createElement('div');
            navSpacer.id = 'navSpacer';
            navSpacer.className = 'nav-spacer';
            // insert after headerContainer if exists, otherwise before mainContent
            if (headerContainer && headerContainer.parentNode) headerContainer.parentNode.insertBefore(navSpacer, headerContainer.nextSibling);
            else if (mainContent && mainContent.parentNode) mainContent.parentNode.insertBefore(navSpacer, mainContent);
        }
        // set spacer height equal to navWrapper's computed height so content doesn't jump
        const navHeight = navWrapper.offsetHeight || 64;
        navSpacer.style.height = `${navHeight + 24}px`;
        navSpacer.classList.add('visible');
        return true;
    }

    function clearMidPosition() {
        if (!navWrapper) return;
        navWrapper.classList.remove('nav-mid');
        navWrapper.style.top = '';
        navWrapper.style.transform = '';
        const navSpacer = document.getElementById('navSpacer');
        if (navSpacer) {
            navSpacer.classList.remove('visible');
            // remove after transition
            setTimeout(() => { navSpacer && navSpacer.remove(); }, 350);
        }
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                const scrollingDown = currentScroll > lastScrollY;

                // detect direction change and record Y for threshold checks
                if ((scrollingDown && lastScrollY > lastDirectionChangeY) || (!scrollingDown && lastScrollY < lastDirectionChangeY)) {
                    lastDirectionChangeY = lastScrollY;
                }

                if (shouldBeSticky() && scrollingDown) {
                    // scrolling down past threshold -> stick to top
                    navWrapper && navWrapper.classList.add('nav-sticky');
                    // remove any midpoint inline styles
                    navWrapper && navWrapper.classList.remove('nav-mid');
                    if (navWrapper) {
                        navWrapper.style.top = '';
                        navWrapper.style.transform = '';
                    }
                    // if locked, only release when user scrolls down enough
                    if (lockMid) {
                        if (lastLockY !== null && (currentScroll - lastLockY) >= DOWN_RELEASE_THRESHOLD) {
                            lockMid = false;
                            lastLockY = null;
                        }
                    }
                } else if (!scrollingDown && shouldBeSticky()) {
                    // scrolling up while past threshold -> consider locking to midpoint only after threshold
                    const upwardDistance = lastDirectionChangeY - currentScroll;
                    if (!lockMid && upwardDistance >= UP_LOCK_THRESHOLD) {
                        const ok = positionNavMid();
                        if (ok) {
                            lockMid = true;
                            lastLockY = currentScroll;
                        } else navWrapper && navWrapper.classList.remove('nav-sticky');
                    } else if (lockMid) {
                        // already locked; keep it
                        positionNavMid();
                    }
                } else if (!shouldBeSticky() && !scrollingDown) {
                    // near top and scrolling up -> clear any special positions so default centered style applies
                    navWrapper && navWrapper.classList.remove('nav-sticky');
                    clearMidPosition();
                }

                lastScrollY = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }

    // Initialize based on initial position
    if (shouldBeSticky()) {
        navWrapper && navWrapper.classList.add('nav-sticky');
    } else {
        navWrapper && navWrapper.classList.remove('nav-sticky');
        clearMidPosition();
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Floating behavior: always visible (no hide-on-scroll)
    if (navWrapper) navWrapper.classList.remove('nav-hidden');

    // Active link highlighting on scroll (match index behavior)
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Subtle elevate nav when sticky
    const elevateWhenSticky = () => {
        if (!navWrapper) return;
        // Always shadow because it's floating
        navWrapper.style.boxShadow = '0 8px 20px rgba(0,0,0,0.18)';
    };
    elevateWhenSticky();
    window.addEventListener('scroll', elevateWhenSticky);
});