document.addEventListener('DOMContentLoaded', function () {
    // Ensure akomodasi modal lives under body (avoid being inside grid)
    const akModal = document.getElementById('modal');
    if (akModal && akModal.parentElement !== document.body) {
        document.body.appendChild(akModal);
    }
    // Highlight timeline row on hover
    document.querySelectorAll('.timeline-row').forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            row.classList.add('active');
        });
        row.addEventListener('mouseleave', function() {
            row.classList.remove('active');
        });
    });

    // Animate timeline rows when they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe timeline rows
    document.querySelectorAll('.timeline-row').forEach(function(row) {
        observer.observe(row);
    });

    // Reveal Sejarah title on scroll similar to Data Desa title
    const sejarahTitle = document.querySelector('.sejarah-header h2');
    if (sejarahTitle) {
        sejarahTitle.classList.add('reveal');
        observer.observe(sejarahTitle);
    }

    // Reveal Data Desa elements (title and boxes)
    const revealEls = document.querySelectorAll('.data-desa-section .data-desa-title, .data-desa-section .data-desa-box');
    revealEls.forEach(el => {
        el.classList.add('reveal'); // start hidden and gently slide up on show
        observer.observe(el);
    });

    // Reveal VISI & MISI elements with unique motion
    const vmmEls = document.querySelectorAll('.visi-misi-section .visi-title, .visi-misi-section .visi-desc, .visi-misi-section .misi-title, .visi-misi-section .misi-list');
    vmmEls.forEach(el => {
        el.classList.add('vmm-reveal');
        observer.observe(el);
    });

    // Struktur reveal animations (menu, content, title)
    const strukturTitle = document.querySelector('.struktur-section .struktur-title');
    const strukturMenu = document.querySelector('.struktur-section .struktur-menu');
    const strukturContent = document.querySelector('.struktur-section .struktur-content');

    [strukturTitle, strukturMenu, strukturContent].forEach(el => {
        if (el) {
            el.classList.add('str-reveal');
            observer.observe(el);
        }
    });

    // Stagger reveal inside struktur-content
    if (strukturContent) {
        strukturContent.classList.add('str-reveal-stagger');
        const innerItems = strukturContent.querySelectorAll('.struktur-org-title, .struktur-list li, .struktur-pdf-btn, .struktur-org-img-wrapper');
        innerItems.forEach(item => observer.observe(item));
    }

    // Navbar floating logic
    const nav = document.querySelector('.profil-nav');
    const headerBg = document.querySelector('.header-bg');
    const navLinks = nav.querySelectorAll('a[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    // Toggle floating state: dock nav to top as soon as header is mostly out OR when reaching Data Desa
    function updateNavFloating() {
        if (!nav) return;
        const headerH = headerBg ? headerBg.offsetHeight : 0;
        const dataDesa = document.getElementById('data-desa');
        const dataDesaTop = dataDesa ? dataDesa.offsetTop : Number.POSITIVE_INFINITY;
        // Dock point: earlier of (header mostly out) or (nearing Data Desa top)
        const headerThreshold = headerH > 0 ? headerH - 120 : 0; // buffer to dock a bit earlier
        const dataDesaThreshold = isFinite(dataDesaTop) ? (dataDesaTop - nav.offsetHeight - 16) : Number.POSITIVE_INFINITY;
        const dockPoint = Math.min(headerThreshold, dataDesaThreshold);

        if (window.scrollY >= dockPoint) {
            if (!nav.classList.contains('floating')) nav.classList.add('floating');
            document.body.classList.add('profil-nav-floating');
        } else {
            nav.classList.remove('floating');
            document.body.classList.remove('profil-nav-floating');
        }
    }

    window.addEventListener('scroll', updateNavFloating);
    window.addEventListener('resize', updateNavFloating);
    updateNavFloating();

    // Scrollspy highlight
    function onScroll() {
        let scrollPos = window.scrollY + nav.offsetHeight + 10;
        let found = false;
        sections.forEach((section, idx) => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[idx].classList.add('active');
                found = true;
            }
        });
        if (!found) navLinks.forEach(link => link.classList.remove('active'));
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - nav.offsetHeight + 1,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Struktur Organisasi tab logic
    const strukturTabs = document.querySelectorAll('.struktur-tab');
    const strukturOrgs = document.querySelectorAll('.struktur-org');
    strukturTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            strukturTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            strukturOrgs.forEach(org => {
                org.style.display = org.id === tab.dataset.org ? 'block' : 'none';
            });
        });
    });

    // Awards gallery data (grouped by gallery id)
    const awardsGalleries = {
        'awards-unesco': [
            'asset/img/profil-desa/penghargaan-unesco.png'
        ],
        'awards-adwi': [
            'asset/img/profil-desa/pssti.jpg',
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (5).jpeg',
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (4).jpeg'
        ]
    };

    // Awards Modal logic (open/close + slider)
    const awardsModal = document.getElementById('awardsModal');
    const awardsSlider = document.getElementById('awardsSlider');
    const awardsCounter = document.getElementById('awardsCounter');
    const awardsClose = document.getElementById('awardsClose');
    const awardsPrev = document.getElementById('awardsPrev');
    const awardsNext = document.getElementById('awardsNext');
    let currentGallery = [];
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function openAwards(galleryId) {
        const imgs = awardsGalleries[galleryId];
        if (!imgs || !imgs.length) return;
        currentGallery = imgs;
        currentIndex = 0;
        awardsSlider.innerHTML = imgs.map(src => `<div class="awards-slide"><img src="${src}" alt="award"></div>`).join('');
        updateAwardsSlider();
        awardsModal.classList.add('open');
        awardsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeAwards() {
        awardsModal.classList.remove('open');
        awardsModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    function updateAwardsSlider() {
        const offset = -currentIndex * 100;
        awardsSlider.style.transform = `translateX(${offset}%)`;
        awardsCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }
    function nextAwards() { currentIndex = (currentIndex + 1) % currentGallery.length; updateAwardsSlider(); }
    function prevAwards() { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; updateAwardsSlider(); }

    // Open handlers (buttons and card click/Enter)
    document.querySelectorAll('.award-view, .award-card').forEach(el => {
        el.addEventListener('click', () => {
            const gid = el.getAttribute('data-gallery') || el.querySelector('[data-gallery]')?.getAttribute('data-gallery');
            if (gid) openAwards(gid);
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const gid = el.getAttribute('data-gallery') || el.querySelector('[data-gallery]')?.getAttribute('data-gallery');
                if (gid) openAwards(gid);
            }
        });
    });

    // Close and nav buttons
    if (awardsClose) awardsClose.addEventListener('click', closeAwards);
    if (awardsPrev) awardsPrev.addEventListener('click', prevAwards);
    if (awardsNext) awardsNext.addEventListener('click', nextAwards);
    awardsModal?.addEventListener('click', e => { if (e.target === awardsModal) closeAwards(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!awardsModal || !awardsModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeAwards();
        if (e.key === 'ArrowRight') nextAwards();
        if (e.key === 'ArrowLeft') prevAwards();
    });

    // Touch swipe
    awardsSlider?.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; }, {passive:true});
    awardsSlider?.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            diff < 0 ? nextAwards() : prevAwards();
            isDragging = false;
        }
    }, {passive:true});
    awardsSlider?.addEventListener('touchend', () => { isDragging = false; });

    // Show/hide BPD PDF
    const openBpdPdfBtn = document.getElementById('openBpdPdf');
    const bpdPdfWrapper = document.getElementById('bpdPdfWrapper');
    if (openBpdPdfBtn && bpdPdfWrapper) {
        openBpdPdfBtn.addEventListener('click', function() {
            if (bpdPdfWrapper.style.display === 'none' || bpdPdfWrapper.style.display === '') {
                bpdPdfWrapper.style.display = 'block';
                openBpdPdfBtn.textContent = 'Tutup PDF';
            } else {
                bpdPdfWrapper.style.display = 'none';
                openBpdPdfBtn.textContent = 'Lihat PDF';
            }
        });
    }

    // Show/hide Bumdes PDF
    const openBumdesPdfBtn = document.getElementById('openBumdesPdf');
    const bumdesPdfWrapper = document.getElementById('bumdesPdfWrapper');
    if (openBumdesPdfBtn && bumdesPdfWrapper) {
        openBumdesPdfBtn.addEventListener('click', function() {
            if (bumdesPdfWrapper.style.display === 'none' || bumdesPdfWrapper.style.display === '') {
                bumdesPdfWrapper.style.display = 'block';
                openBumdesPdfBtn.textContent = 'Tutup PDF';
            } else {
                bumdesPdfWrapper.style.display = 'none';
                openBumdesPdfBtn.textContent = 'Lihat PDF';
            }
        });
    }

    // Show/hide Karang Taruna PDF
    const openKarangTarunaPdfBtn = document.getElementById('openKarangTarunaPdf');
    const karangTarunaPdfWrapper = document.getElementById('karangTarunaPdfWrapper');
    if (openKarangTarunaPdfBtn && karangTarunaPdfWrapper) {
        openKarangTarunaPdfBtn.addEventListener('click', function() {
            if (karangTarunaPdfWrapper.style.display === 'none' || karangTarunaPdfWrapper.style.display === '') {
                karangTarunaPdfWrapper.style.display = 'block';
                openKarangTarunaPdfBtn.textContent = 'Tutup PDF';
            } else {
                karangTarunaPdfWrapper.style.display = 'none';
                openKarangTarunaPdfBtn.textContent = 'Lihat PDF';
            }
        });
    }

    // Show/hide Pokdarwis PDF
    const openPokdarwisPdfBtn = document.getElementById('openPokdarwisPdf');
    const pokdarwisPdfWrapper = document.getElementById('pokdarwisPdfWrapper');
    if (openPokdarwisPdfBtn && pokdarwisPdfWrapper) {
        openPokdarwisPdfBtn.addEventListener('click', function() {
            if (pokdarwisPdfWrapper.style.display === 'none' || pokdarwisPdfWrapper.style.display === '') {
                pokdarwisPdfWrapper.style.display = 'block';
                openPokdarwisPdfBtn.textContent = 'Tutup PDF';
            } else {
                pokdarwisPdfWrapper.style.display = 'none';
                openPokdarwisPdfBtn.textContent = 'Lihat PDF';
            }
        });
    }

    // Show/hide Sardes PDF
    const openSardesPdfBtn = document.getElementById('openSardesPdf');
    const sardesPdfWrapper = document.getElementById('sardesPdfWrapper');
    if (openSardesPdfBtn && sardesPdfWrapper) {
        openSardesPdfBtn.addEventListener('click', function() {
            if (sardesPdfWrapper.style.display === 'none' || sardesPdfWrapper.style.display === '') {
                sardesPdfWrapper.style.display = 'block';
                openSardesPdfBtn.textContent = 'Tutup PDF';
            } else {
                sardesPdfWrapper.style.display = 'none';
                openSardesPdfBtn.textContent = 'Lihat PDF';
            }
        });
    }

    // Pop-out image modal for Struktur Organisasi BPD
    const strukturImg = document.getElementById('bpdStrukturImg');
    const imgModal = document.getElementById('imgModal');
    const imgModalContent = document.getElementById('imgModalContent');
    const imgModalClose = document.getElementById('imgModalClose');

    if (strukturImg && imgModal && imgModalContent && imgModalClose) {
        strukturImg.addEventListener('click', function() {
            imgModal.style.display = 'flex';
            imgModalContent.src = strukturImg.src;
        });
        imgModalClose.addEventListener('click', function() {
            imgModal.style.display = 'none';
            imgModalContent.src = '';
        });
        imgModal.addEventListener('click', function(e) {
            if (e.target === imgModal) {
                imgModal.style.display = 'none';
                imgModalContent.src = '';
            }
        });
    }
});