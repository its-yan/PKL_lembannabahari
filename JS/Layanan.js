function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    if (tabName === 'fasilitas') {
        document.getElementById('fasilitas-content').classList.add('active');
        tabs[0].classList.add('active');
    } else if (tabName === 'produk') {
        document.getElementById('produk-content').classList.add('active');
        tabs[1].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Back button scroll/fade logic
    const backBtn = document.querySelector('.back-layanan-btn');
    if (backBtn) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function() {
            let currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                // Scrolling down, fade out
                backBtn.style.opacity = '0.5';
                backBtn.style.transform = 'scale(0.98)';
            } else {
                // Scrolling up, fade in
                backBtn.style.opacity = '1';
                backBtn.style.transform = 'scale(1.08)';
            }
            lastScrollY = currentScrollY;
        });
        backBtn.addEventListener('mouseenter', function() {
            backBtn.style.transform = 'scale(1.12)';
            backBtn.style.opacity = '1';
        });
        backBtn.addEventListener('mouseleave', function() {
            backBtn.style.transform = 'scale(1.08)';
        });
    }
    // Gallery Lightbox for .gallery.reveal
    document.querySelectorAll('.gallery.reveal').forEach(function(gallery) {
        const thumbs = gallery.querySelector('.gallery-thumbs');
        const lightbox = gallery.querySelector('.gallery-lightbox');
        const lightboxContent = gallery.querySelector('.gallery-lightbox-content');
        const closeBtn = gallery.querySelector('.gallery-close');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        let items = Array.from(thumbs.querySelectorAll('img,video'));
        let currentIdx = 0;

        function showLightbox(idx) {
            currentIdx = idx;
            lightboxContent.innerHTML = '';
            const el = items[idx].cloneNode(true);
            el.style.maxWidth = '700px';
            el.style.maxHeight = '70vh';
            el.setAttribute('controls', el.tagName === 'VIDEO' ? true : undefined);
            lightboxContent.appendChild(el);
            lightbox.style.display = 'flex';
        }
        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxContent.innerHTML = '';
        }
        function showPrev() {
            showLightbox((currentIdx - 1 + items.length) % items.length);
        }
        function showNext() {
            showLightbox((currentIdx + 1) % items.length);
        }
        thumbs.querySelectorAll('figure').forEach((fig, idx) => {
            fig.addEventListener('click', () => showLightbox(idx));
        });
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            }
        });
    });
    // Promo Scroll Indicator Dots Logic
    function setupPromoScrollIndicator(scrollSelector, indicatorSelector) {
        const scroll = document.querySelector(scrollSelector);
        const indicator = document.querySelector(indicatorSelector);
        if (!scroll || !indicator) return;

        const cards = scroll.querySelectorAll('.promo-card');
        indicator.innerHTML = '';
        cards.forEach((card, idx) => {
            const dot = document.createElement('button');
            dot.className = 'promo-scroll-dot';
            dot.setAttribute('aria-label', 'Go to card ' + (idx + 1));
            dot.addEventListener('click', () => {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            });
            indicator.appendChild(dot);
        });

        function updateActiveDot() {
            let activeIdx = 0;
            let minDist = Infinity;
            cards.forEach((card, idx) => {
                const rect = card.getBoundingClientRect();
                const dist = Math.abs(rect.left - scroll.getBoundingClientRect().left);
                if (dist < minDist) {
                    minDist = dist;
                    activeIdx = idx;
                }
            });
            indicator.querySelectorAll('.promo-scroll-dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIdx);
            });
        }
        scroll.addEventListener('scroll', updateActiveDot);
        window.addEventListener('resize', updateActiveDot);
        updateActiveDot();
    }

    setupPromoScrollIndicator('.promo-container .promo-scroll');
    setupPromoScrollIndicator('#produk-content .promo-scroll');
    const topBar = document.querySelector('.top-bar');
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', function() {
        let currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
            // Scroll down: show top-bar
            topBar.style.transform = 'translate(-50%, 0)';
            topBar.style.opacity = '1';
        } else {
            // Scroll up: hide top-bar
            topBar.style.transform = 'translate(-50%, -100%)';
            topBar.style.opacity = '0';
        }
        lastScroll = currentScroll;
    });

    const searchInput = document.querySelector('.search-bar input');
    const promoCards = document.querySelectorAll('.promo-card');
    const recommendationCards = document.querySelectorAll('.recommendation-card');

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        // Filter promo cards
        promoCards.forEach(card => {
            const title = card.querySelector('h3');
            const text = card.querySelector('p');
            const content = (title ? title.textContent : '') + ' ' + (text ? text.textContent : '');
            if (content.toLowerCase().includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        // Filter recommendation cards
        recommendationCards.forEach(card => {
            const title = card.querySelector('h3');
            const text = card.querySelector('p');
            const content = (title ? title.textContent : '') + ' ' + (text ? text.textContent : '');
            if (content.toLowerCase().includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Enhanced promo scroll functionality
    const promoScrolls = document.querySelectorAll('.promo-scroll');
    
    promoScrolls.forEach(scrollContainer => {
        let isHovered = false;
        let animationSpeed = 10; // seconds
        
        // Pause animation on hover
        scrollContainer.addEventListener('mouseenter', function() {
            isHovered = true;
            this.style.animationPlayState = 'paused';
        });
        
        scrollContainer.addEventListener('mouseleave', function() {
            isHovered = false;
            this.style.animationPlayState = 'running';
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        scrollContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            this.style.animationPlayState = 'paused';
        });
        
        scrollContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            this.style.animationPlayState = 'running';
        });
    });

    // Biarkan anchor .card-link melakukan navigasi normal (hapus preventDefault dan console.log)
    // Tidak diperlukan handler khusus di sini.

    // Lightbox/Gallery logic
    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">✕</button>
                <button class="lightbox-prev" aria-label="Previous">‹</button>
                <img class="lightbox-media" alt="media" />
                <button class="lightbox-next" aria-label="Next">›</button>
                <div class="lightbox-zoom">
                    <button data-zoom="out">-</button>
                    <button data-zoom="reset">100%</button>
                    <button data-zoom="in">+</button>
                </div>
            </div>`;
        document.body.appendChild(overlay);
        return overlay;
    }

    const lightbox = createLightbox();
    const mediaEl = lightbox.querySelector('.lightbox-media');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');
    const zoomBar = lightbox.querySelector('.lightbox-zoom');

    let currentItems = [];
    let currentIndex = 0;
    let zoom = 1;

    function showIndex(idx) {
        if (idx < 0) idx = currentItems.length - 1;
        if (idx >= currentItems.length) idx = 0;
        currentIndex = idx;
        const src = currentItems[currentIndex];
        mediaEl.src = src;
        mediaEl.style.transform = 'scale(1)';
        zoom = 1;
    }

    function openLightbox(items, startIdx) {
        currentItems = items;
        lightbox.classList.add('active');
        showIndex(startIdx);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', () => showIndex(currentIndex - 1));
    btnNext.addEventListener('click', () => showIndex(currentIndex + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Zoom controls
    zoomBar.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-zoom');
        if (!action) return;
        if (action === 'in') zoom = Math.min(zoom + 0.2, 3);
        if (action === 'out') zoom = Math.max(zoom - 0.2, 0.5);
        if (action === 'reset') zoom = 1;
        mediaEl.style.transform = `scale(${zoom})`;
    });

    // Swipe support for lightbox
    let startX = 0;
    let endX = 0;
    mediaEl.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; });
    mediaEl.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) showIndex(currentIndex - 1);
        if (startX - endX > 40) showIndex(currentIndex + 1);
    });

    // Bind gallery items on detail pages
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const thumbs = Array.from(gallery.querySelectorAll('img, video'));
        const items = thumbs.map(el => el.getAttribute('src'));
        thumbs.forEach((el, idx) => {
            el.addEventListener('click', () => openLightbox(items, idx));
        });
    }

    // Observe any .reveal elements on detail pages
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add smooth scroll behavior for better UX
    const smoothScrollTo = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });

    // Add intersection observer for better performance
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

    // Observe cards for animation
    const allCards = document.querySelectorAll('.promo-card, .recommendation-card');
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const modals = document.querySelectorAll('.modal, .overlay');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    // Add window resize handler for responsive behavior
    window.addEventListener('resize', function() {
        // Recalculate any dynamic layouts if needed
        const promoScrolls = document.querySelectorAll('.promo-scroll');
        promoScrolls.forEach(scroll => {
            // Force reflow to ensure proper layout
            scroll.style.animation = 'none';
            scroll.offsetHeight; // Trigger reflow
            scroll.style.animation = null;
        });
    });

    // Auto-generate QR images for page URL on detail pages
    const qrImgs = document.querySelectorAll('img[data-qr="page-url"]');
    if (qrImgs.length) {
        const url = encodeURIComponent(window.location.href);
        const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${url}`;
        qrImgs.forEach(img => { img.src = qrSrc; });
    }
});