<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
    // Ensure akomodasi modal lives under body (avoid being inside grid)
    const akModal = document.getElementById('modal');
    if (akModal && akModal.parentElement !== document.body) {
        document.body.appendChild(akModal);
    }
=======
// Gallery 3D Carousel
class Gallery3D {
    constructor() {
        this.track = document.getElementById('galeriScroll');
        this.slides = Array.from(this.track.children);
        this.prevBtn = document.getElementById('galeriPrev');
        this.nextBtn = document.getElementById('galeriNext');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.goToPrevious());
        this.nextBtn.addEventListener('click', () => this.goToNext());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goToPrevious();
            if (e.key === 'ArrowRight') this.goToNext();
        });

        // Touch/swipe support - Improved
        let startX = 0;
        let startY = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent page scrolling when swiping gallery
        }, { passive: false });

        this.track.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            // Calculate horizontal and vertical distance
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only register as swipe if horizontal movement is greater than vertical
            // and greater than minimum threshold (30px)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                if (diffX > 0) {
                    this.goToNext();
                } else {
                    this.goToPrevious();
                }
            }
        });

        // Mouse drag support - Improved
        let isDragging = false;
        let dragStartX = 0;

        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            this.track.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent text selection during drag
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.cursor = 'grab';

            const dragEndX = e.clientX;
            const diff = dragStartX - dragEndX;

            // Only register as drag if movement is greater than minimum threshold (30px)
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    this.goToNext();
                } else {
                    this.goToPrevious();
                }
            }
        });

        // Auto-play (optional)
        setInterval(() => this.goToNext(), 5000);

        // Click to open modal for slides
        this.slides.forEach(slide => {
            slide.style.cursor = 'pointer';
            slide.addEventListener('click', () => {
                const img = slide.querySelector('img');
                if (img) {
                    openImageModal(img.src, img.alt || 'Gallery Image', 'Explore our beautiful gallery');
                }
            });
        });
    }

    updatePositions() {
        this.slides.forEach((slide, index) => {
            const relativeIndex = (index - this.currentIndex + this.totalSlides) % this.totalSlides;

            slide.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            switch(relativeIndex) {
                case 0: // Center
                    slide.style.transform = 'translateX(0px) translateZ(0px) rotateY(0deg)';
                    slide.style.opacity = '1';
                    slide.style.zIndex = '3';
                    break;
                case 1: // Right 1
                    slide.style.transform = 'translateX(200px) translateZ(-100px) rotateY(-15deg)';
                    slide.style.opacity = '0.8';
                    slide.style.zIndex = '2';
                    break;
                case 2: // Right 2
                    slide.style.transform = 'translateX(400px) translateZ(-200px) rotateY(-25deg)';
                    slide.style.opacity = '0.6';
                    slide.style.zIndex = '1';
                    break;
                case this.totalSlides - 1: // Left 1
                    slide.style.transform = 'translateX(-200px) translateZ(-100px) rotateY(15deg)';
                    slide.style.opacity = '0.8';
                    slide.style.zIndex = '2';
                    break;
                case this.totalSlides - 2: // Left 2
                    slide.style.transform = 'translateX(-400px) translateZ(-200px) rotateY(25deg)';
                    slide.style.opacity = '0.6';
                    slide.style.zIndex = '1';
                    break;
                default: // Hidden slides
                    slide.style.transform = 'translateX(600px) translateZ(-300px) rotateY(-30deg)';
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                    break;
            }
        });
    }

    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updatePositions();
    }

    goToPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updatePositions();
    }
}

// Global function to open image modal
function openImageModal(src, title, description) {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    if (imageModal && modalImage && modalTitle && modalDescription) {
        modalImage.src = src;
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        imageModal.style.display = 'block';
        setTimeout(() => {
            imageModal.classList.add('show');
        }, 10);

        document.body.style.overflow = 'hidden';
    }
}

// Hamburger menu functionality - executed immediately and robustly
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburgerMenu');
  const navAtas = document.querySelector('.nav-atas');
  const mainNav = document.querySelector('.main-nav');
  
  // Function to close the mobile menu
  function closeMobileMenu() {
    if (navAtas) navAtas.classList.remove('show-menu');
    if (hamburger) hamburger.classList.remove('active');
    if (mainNav) mainNav.classList.remove('show-menu');
    // Re-enable body scroll
    document.body.style.overflow = '';
  }

  // Function to open the mobile menu
  function openMobileMenu() {
    if (navAtas) navAtas.classList.add('show-menu');
    if (hamburger) hamburger.classList.add('active');
    if (mainNav) mainNav.classList.add('show-menu');
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && navAtas) {
    // Remove existing event listeners if any
    hamburger.replaceWith(hamburger.cloneNode(true));
    const freshHamburger = document.getElementById('hamburgerMenu');
    
    // Hamburger click handler
    freshHamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isMenuOpen = navAtas.classList.contains('show-menu');
      
      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Click outside to close menu
    document.addEventListener('click', function(e) {
      const isClickInsideNav = navAtas.contains(e.target);
      const isMenuOpen = navAtas.classList.contains('show-menu');
      
      if (!isClickInsideNav && isMenuOpen) {
        closeMobileMenu();
      }
    });

    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navAtas.classList.contains('show-menu')) {
        closeMobileMenu();
      }
    });
    
    // Close menu when mobile links are clicked (anchor links)
    function attachMobileLinksHandlers() {
      const mobileLinks = document.querySelectorAll('.mobile-menu-list a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Small delay to allow smooth scrolling before closing menu
          setTimeout(() => {
            closeMobileMenu();
          }, 300);
        });
      });
    }
    
    // Attach mobile links handlers
    attachMobileLinksHandlers();
    
    console.log('Hamburger menu initialized successfully');
  }
}

// Initialize hamburger menu when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHamburgerMenu);
} else {
  initializeHamburgerMenu();
}

// Backup initialization after a short delay in case DOMContentLoaded fails
setTimeout(initializeHamburgerMenu, 500);

document.addEventListener('DOMContentLoaded', function () {
    // Ensure akomodasi modal lives under body (avoid being inside grid)
    const akModal = document.getElementById('modal');
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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

    // Medsos smooth entrance (Instagram big card + tiles)
    const medsosAnimEls = document.querySelectorAll('.ms-animate');
    medsosAnimEls.forEach(el => observer.observe(el));

<<<<<<< HEAD
=======
    // Person in Charge smooth entrance
    const personAnimEls = document.querySelectorAll('.person-in-charge-title, .person-card');
    personAnimEls.forEach(el => {
        el.classList.add('person-animate');
        observer.observe(el);
    });

>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (5).jpeg',
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (4).jpeg'
=======
            'asset/img/profil-desa/piagam.jpeg',
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (5).jpeg',
            'asset/img/profil-desa/WhatsApp Image 2025-09-13 at 09.48.45 (4).jpeg'
        ], 
        'awards-adwi22' : [
            'asset/img/profil-desa/piagam-2022.jpeg'
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
                openBpdPdfBtn.textContent = 'Tutup PDF';
            } else {
                bpdPdfWrapper.style.display = 'none';
                openBpdPdfBtn.textContent = 'Lihat PDF';
=======
                openBpdPdfBtn.textContent = 'Tutup SK BPD';
            } else {
                bpdPdfWrapper.style.display = 'none';
                openBpdPdfBtn.textContent = 'Lihat SK BPD';
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
                openBumdesPdfBtn.textContent = 'Tutup PDF';
            } else {
                bumdesPdfWrapper.style.display = 'none';
                openBumdesPdfBtn.textContent = 'Lihat PDF';
=======
                openBumdesPdfBtn.textContent = 'Tutup SK BUMDES';
            } else {
                bumdesPdfWrapper.style.display = 'none';
                openBumdesPdfBtn.textContent = 'Lihat SK BUMBES';
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
                openKarangTarunaPdfBtn.textContent = 'Tutup PDF';
            } else {
                karangTarunaPdfWrapper.style.display = 'none';
                openKarangTarunaPdfBtn.textContent = 'Lihat PDF';
=======
                openKarangTarunaPdfBtn.textContent = 'Tutup SK KARANG TARUNA';
            } else {
                karangTarunaPdfWrapper.style.display = 'none';
                openKarangTarunaPdfBtn.textContent = 'Lihat SK KARANG TARUNA';
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
                openPokdarwisPdfBtn.textContent = 'Tutup PDF';
            } else {
                pokdarwisPdfWrapper.style.display = 'none';
                openPokdarwisPdfBtn.textContent = 'Lihat PDF';
=======
                openPokdarwisPdfBtn.textContent = 'Tutup SK POKDARWIS';
            } else {
                pokdarwisPdfWrapper.style.display = 'none';
                openPokdarwisPdfBtn.textContent = 'Lihat SK POKDARWIS';
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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
<<<<<<< HEAD
                openSardesPdfBtn.textContent = 'Tutup PDF';
            } else {
                sardesPdfWrapper.style.display = 'none';
                openSardesPdfBtn.textContent = 'Lihat PDF';
=======
                openSardesPdfBtn.textContent = 'Tutup SK SARDES';
            } else {
                sardesPdfWrapper.style.display = 'none';
                openSardesPdfBtn.textContent = 'Lihat SK SARDES';
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
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

    // =====================
    // PETA: Tabs, Reveal, Modal
    // =====================
    (function(){
        const tabPeta = document.getElementById('tabPeta');
        const tabEv = document.getElementById('tabEvakuasi');
<<<<<<< HEAD
        const panelPeta = document.getElementById('panelPeta');
        const panelEv = document.getElementById('panelEvakuasi');

        function activate(tab){
            if(!tab || !tabPeta || !tabEv || !panelPeta || !panelEv) return;
            const isPeta = tab === tabPeta;
            tabPeta.classList.toggle('active', isPeta);
            tabEv.classList.toggle('active', !isPeta);
            tabPeta.setAttribute('aria-selected', isPeta);
            tabEv.setAttribute('aria-selected', !isPeta);
            panelPeta.hidden = !isPeta;
            panelEv.hidden = isPeta;
            panelPeta.classList.toggle('active', isPeta);
            panelEv.classList.toggle('active', !isPeta);
        }
        tabPeta && tabPeta.addEventListener('click', ()=>activate(tabPeta));
        tabEv && tabEv.addEventListener('click', ()=>activate(tabEv));
=======
        const tabTs = document.getElementById('tabTsunami');
        const panelPeta = document.getElementById('panelPeta');
        const panelEv = document.getElementById('panelEvakuasi');
        const panelTs = document.getElementById('panelTsunami');

        function activate(tab){
            if(!tab) return;
            // Deactivate all
            [tabPeta, tabEv, tabTs].forEach(t => {
                if(t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                }
            });
            [panelPeta, panelEv, panelTs].forEach(p => {
                if(p) {
                    p.hidden = true;
                    p.classList.remove('active');
                    p.classList.remove('in');
                }
            });
            // Activate selected
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            let panel;
            if(tab === tabPeta) panel = panelPeta;
            else if(tab === tabEv) panel = panelEv;
            else if(tab === tabTs) panel = panelTs;
            if(panel) {
                panel.hidden = false;
                panel.classList.add('active');
                // Add 'in' after a short delay to ensure reveal animation triggers
                setTimeout(() => panel.classList.add('in'), 10);
            }
        }
        tabPeta && tabPeta.addEventListener('click', ()=>activate(tabPeta));
        tabEv && tabEv.addEventListener('click', ()=>activate(tabEv));
        tabTs && tabTs.addEventListener('click', ()=>activate(tabTs));
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a

        // Reveal on scroll khusus peta
        const ioPeta = new IntersectionObserver((entries)=>{
            entries.forEach(e=>{ if(e.isIntersecting) { e.target.classList.add('in'); ioPeta.unobserve(e.target);} });
        }, { threshold:.15 });
        document.querySelectorAll('#peta .reveal').forEach(el=>ioPeta.observe(el));

<<<<<<< HEAD
        // Modal gallery untuk peta
        const images = [
            'asset/img/profil-desa/peta.jpeg',
            'asset/img/profil-desa/Jalur-evakuasi.jpg'
        ];
=======
        // Modal gallery untuk peta - per panel
        const imagesPeta = ['asset/img/profil-desa/peta.jpeg'];
        const imagesEvakuasi = ['asset/img/profil-desa/jalur-evakuasi.jpeg' , 'asset/img/profil-desa/Jalur-evakuasi.jpg'];
        const imagesTsunami = ['asset/img/profil-desa/tsunami.jpeg'];
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        const modal = document.getElementById('mapModal');
        const stage = document.getElementById('mapStageImg');
        const counter = document.getElementById('mapCounter');
        const closeBtn = document.getElementById('mapClose');
        const prevBtn = document.getElementById('mapPrev');
        const nextBtn = document.getElementById('mapNext');
<<<<<<< HEAD
        let idx = 0;
        function update(){ if(stage && counter){ stage.src = images[idx]; counter.textContent = (idx+1)+' / '+images.length; } }
        function open(i){ if(!modal) return; idx = i; update(); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
        function close(){ if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
        function prev(){ idx = (idx-1+images.length)%images.length; update(); }
        function next(){ idx = (idx+1)%images.length; update(); }
=======
        let currentImages = [];
        let idx = 0;
        function update(){ if(stage && counter && currentImages.length){ stage.src = currentImages[idx]; counter.textContent = (idx+1)+' / '+currentImages.length; } }
        function open(panelIndex){ if(!modal) return;
            if(panelIndex === 0) currentImages = imagesPeta;
            else if(panelIndex === 1) currentImages = imagesEvakuasi;
            else if(panelIndex === 2) currentImages = imagesTsunami;
            idx = 0; update(); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
        }
        function close(){ if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
        function prev(){ if(currentImages.length > 1){ idx = (idx-1+currentImages.length)%currentImages.length; update(); } }
        function next(){ if(currentImages.length > 1){ idx = (idx+1)%currentImages.length; update(); } }
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
        document.querySelectorAll('#peta .peta-view-btn, #peta .peta-figure').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                const i = Number(btn.getAttribute('data-index')) || 0;
                open(i);
            })
        });
        closeBtn && closeBtn.addEventListener('click', close);
        prevBtn && prevBtn.addEventListener('click', prev);
        nextBtn && nextBtn.addEventListener('click', next);
        modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
        document.addEventListener('keydown', (e)=>{ if(!modal || !modal.classList.contains('open')) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') prev(); if(e.key==='ArrowRight') next(); });
<<<<<<< HEAD
    })();

    // =====================
    // GALERI: data + render + overlay popout
    // =====================
    (function(){
        const items = [
            // Pantai & pemandangan
            { type: 'image', thumb: 'asset/img/wisata andalah/pantai-mandala-6.webp', src: 'asset/img/wisata andalah/pantai-mandala-5.webp', title: 'Kegiatan Bersih Pantai', desc: 'Aksi bersih pantai Mandala Ria bersama warga & pengelola wisata.', tags: ['Lingkungan','Gotong Royong'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/pantai-mandala-7.webp', src: 'asset/img/wisata andalah/pantai-mandala-7.webp', title: 'Senja Mandala Ria', desc: 'Panorama senja di pantai Mandala Ria.', tags: ['Pantai','Senja'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/pantai-mandala-2.jpeg', src: 'asset/img/wisata andalah/pantai-mandala-3.jpeg', title: 'Garis Pantai', desc: 'Garis pantai yang panjang dengan pasir yang lembut.', tags: ['Pantai'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/pantai-andalan-1.jpeg', src: 'asset/img/wisata andalah/pantai-andalan-1.jpeg', title: 'Pantai Andalan', desc: 'Spot favorit wisatawan untuk swafoto.', tags: ['Pantai'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/pantai-mandala-4.jpeg', src: 'asset/img/wisata andalah/pantai-mandala-4.jpeg', title: 'Festival Kuliner Pesisir', desc: 'Promosi kuliner laut khas Ara oleh UMKM desa.', tags: ['Kuliner','UMKM'] },

            // Tebing Mattoanging & batu
            { type: 'image', thumb: 'asset/img/wisata andalah/tebing-mattoanging.webp', src: 'asset/img/wisata andalah/tebing-mattoanging.webp', title: 'Tebing Mattoanging', desc: 'Karst eksotis yang menjadi ikon jalur trekking.', tags: ['Tebing','Alam'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/tebing-mattoanging-2.webp', src: 'asset/img/wisata andalah/tebing-mattoanging-3.webp', title: 'Kontur Tebing', desc: 'Formasi karst unik, aman untuk jalur hiking terpilih.', tags: ['Trekking'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/tebing-mattoanging-4.jpg', src: 'asset/img/wisata andalah/tebing-mattoanging-4.jpg', title: 'Puncak Tebing', desc: 'Pemandangan dari ketinggian.', tags: ['Tebing'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/batu-tongkarayya-1.jpg', src: 'asset/img/wisata andalah/batu-tongkarayya-1.jpg', title: 'Batu Tongkarayya', desc: 'Batu besar dengan nilai budaya.', tags: ['Budaya'] },

            // Gua Passea
            { type: 'image', thumb: 'asset/img/wisata andalah/gua-passea-1.webp', src: 'asset/img/wisata andalah/gua-passea-1.webp', title: 'Gua Passea', desc: 'Eksplorasi gua karst di kawasan Ara.', tags: ['Eksplorasi','Alam'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/gua-passea-2.jpg', src: 'asset/img/wisata andalah/gua-passea-2.jpg', title: 'Lorong Gua', desc: 'Lorong gua dengan permainan cahaya alami.', tags: ['Gua'] },
            { type: 'image', thumb: 'asset/img/wisata andalah/gua-passea-3.jpeg', src: 'asset/img/wisata andalah/gua-passea-3.jpeg', title: 'Celah Batu', desc: 'Celah sempit menuju chamber berikutnya.', tags: ['Gua'] },

            // Camping ground & aktivitas
            { type: 'image', thumb: 'asset/img/wisata andalah/camping-ground-1.jpg', src: 'asset/img/wisata andalah/camping-ground-1.jpg', title: 'Camping Ground', desc: 'Area perkemahan keluarga dan komunitas.', tags: ['Camping'] },

            // UMKM & bengkel kriya
            { type: 'video', thumb: 'asset3/IMG/Bengkel/souvenir-1.jpeg', src: 'asset3/IMG/Bengkel/bengkel kriya Desa Lembanna.mp4', title: 'Bengkel Kriya Miniatur Pinisi', desc: 'Proses pembuatan miniatur Pinisi oleh perajin lokal.', tags: ['UMKM','Kerajinan','Pinisi'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/Bengkel kria.jpg', src: 'asset3/IMG/Bengkel/Bengkel kria.jpg', title: 'Workshop Kriya', desc: 'Suasana kerja di bengkel kriya.', tags: ['UMKM'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/Bengkel Kria 2.jpg', src: 'asset3/IMG/Bengkel/Bengkel Kria 2.jpg', title: 'Karya Perajin', desc: 'Hasil karya yang dipamerkan.', tags: ['UMKM'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/souvenir-2.jpeg', src: 'asset3/IMG/Bengkel/souvenir-2.jpeg', title: 'Souvenir Pinisi', desc: 'Souvenir khas desa: miniatur Pinisi.', tags: ['Souvenir'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/souvenir-3.jpeg', src: 'asset3/IMG/Bengkel/souvenir-3.jpeg', title: 'Detail Kayu', desc: 'Detail pengerjaan kayu.', tags: ['Kerajinan'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/souvenir-4.jpeg', src: 'asset3/IMG/Bengkel/souvenir-4.jpeg', title: 'Finishing', desc: 'Tahap finishing produk.', tags: ['UMKM'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/souvenir-5.jpeg', src: 'asset3/IMG/Bengkel/souvenir-5.jpeg', title: 'Display Produk', desc: 'Display produk siap jual.', tags: ['UMKM'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/souvenir-6.jpeg', src: 'asset3/IMG/Bengkel/souvenir-6.jpeg', title: 'Paket Souvenir', desc: 'Paket souvenir untuk wisatawan.', tags: ['Souvenir'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/Miniatur Pinisi.png', src: 'asset3/IMG/Bengkel/Miniatur Pinisi.png', title: 'Miniatur Pinisi', desc: 'Produk unggulan desa.', tags: ['Pinisi'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/miniatur pinisi andalan souvenir khas kami.jpg', src: 'asset3/IMG/Bengkel/miniatur pinisi andalan souvenir khas kami.jpg', title: 'Miniatur Pinisi Andalan', desc: 'Edisi khusus andalan desa.', tags: ['Pinisi'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/Miniatur Pinisi sbg souvenir khas desa kami.jpg', src: 'asset3/IMG/Bengkel/Miniatur Pinisi sbg souvenir khas desa kami.jpg', title: 'Souvenir Khas', desc: 'Miniatur Pinisi sebagai souvenir khas.', tags: ['Souvenir'] },
            { type: 'image', thumb: 'asset3/IMG/Bengkel/WhatsApp Image 2025-08-20 at 4.51.18 PM.jpeg', src: 'asset3/IMG/Bengkel/WhatsApp Image 2025-08-20 at 4.51.18 PM.jpeg', title: 'Aktivitas Harian', desc: 'Dokumentasi keseharian perajin.', tags: ['UMKM'] },
        ];

        const grid = document.getElementById('galeriGrid');
        const overlay = document.getElementById('galeriOverlay');
        const media = document.getElementById('galeriMedia');
        const desc = document.getElementById('galeriDesc');
        const backBtn = document.getElementById('galeriBack');
        // New: hero widgets
        const chipsWrap = document.getElementById('galeriChips');
        const scroll = document.getElementById('galeriScroll');
        const prevBtn = document.getElementById('galeriPrev');
        const nextBtn = document.getElementById('galeriNext');
        const loadMoreBtn = document.getElementById('galeriLoad');

        if(!grid || !overlay || !media || !desc || !backBtn) return;

        // tag each item with original index for reference
        items.forEach((it, i)=> it._id = i);

        // Build filter list (without chips UI)
        const allTags = (()=>{
            const set = new Set();
            items.forEach(it => (it.tags||[]).forEach(t=> set.add(t)));
            return ['Semua', ...Array.from(set)];
        })();

        let activeTag = 'Semua';
        let filtered = items.slice();
        let shown = 8; // initial items in grid

        // chips UI removed

        function applyFilter(tag){
            activeTag = tag;
            filtered = tag==='Semua' ? items.slice() : items.filter(it => (it.tags||[]).includes(tag));
            shown = Math.min(8, filtered.length);
            // chips UI dihapus; skip renderChips()
            renderGrid();
            renderScroll();
        }

        // Render grid cards (masonry-friendly, lazy images)
        function renderGrid(){
            const slice = filtered.slice(0, shown);
            grid.innerHTML = slice.map(it=> `
                <article class="galeri-item" data-id="${it._id}" tabindex="0" aria-label="Buka detail ${it.title}">
                    <span class="galeri-badge">${it.type === 'video' ? 'VIDEO' : 'FOTO'}</span>
                    <img class="galeri-thumb" src="${it.thumb}" alt="${it.title}" loading="lazy">
                    <div class="galeri-caption">${it.title}</div>
                </article>
            `).join('');
            // Apply masonry layout class
            grid.classList.add('masonry');
            grid.querySelectorAll('.galeri-item').forEach(card=>{
                const id = Number(card.getAttribute('data-id'));
                card.addEventListener('click', ()=>open(id));
                card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') open(id); });
            });
            if(loadMoreBtn){ loadMoreBtn.hidden = shown >= filtered.length; }
        }

        // Horizontal scroller (hero)
        function renderScroll(){
            if(!scroll) return;
            const subset = filtered.slice(0, Math.min(5, filtered.length));
            scroll.innerHTML = subset.map(it=> `
                <figure class="galeri-slide" data-id="${it._id}" tabindex="0">
                    <img src="${it.src || it.thumb}" alt="${it.title}">
                    ${it.type === 'video' ? '<span class="galeri-play" aria-hidden="true">▶︎</span>' : ''}
                </figure>
            `).join('');
            updateActiveSlide();

            // Helper to center a specific slide (rect-based; accounts for transforms)
            function centerSlide(el){
                if(!scroll || !el) return;
                const scrollRect = scroll.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                const delta = (elRect.left + elRect.width/2) - (scrollRect.left + scrollRect.width/2);
                if (Math.abs(delta) > 1) {
                    scroll.scrollBy({ left: delta, behavior: 'smooth' });
                }
                // After transform settles, re-center once more to be pixel-perfect
                const onEnd = (evt)=>{
                    if (evt && evt.propertyName !== 'transform') return;
                    el.removeEventListener('transitionend', onEnd);
                    const sr = scroll.getBoundingClientRect();
                    const er = el.getBoundingClientRect();
                    const d2 = (er.left + er.width/2) - (sr.left + sr.width/2);
                    if (Math.abs(d2) > 0.5) {
                        scroll.scrollBy({ left: d2, behavior: 'smooth' });
                    }
                };
                el.addEventListener('transitionend', onEnd, { once: true });
            }

            scroll.querySelectorAll('.galeri-slide').forEach(slide=>{
                const id = Number(slide.getAttribute('data-id'));
                slide.addEventListener('click', (e)=>{
                    e.preventDefault();
                    // First click on side slide: center it and show 3D only
                    if (!slide.classList.contains('is-active')) {
                        centerSlide(slide);
                        return;
                    }
                    // Second click on the centered slide: open pop-out
                    open(id);
                });
                slide.addEventListener('keydown', (e)=>{
                    if(e.key==='Enter'){
                        if (!slide.classList.contains('is-active')) {
                            centerSlide(slide);
                        } else {
                            open(id);
                        }
                    }
                });
            });
        }

        // Debounce helper
        let updateTimer = null;
        function updateActiveSlide(immediate = false){
            if(!scroll) return;
            if (!immediate) {
                if (updateTimer) clearTimeout(updateTimer);
                updateTimer = setTimeout(() => updateActiveSlide(true), 16); // ~60fps
                return;
            }
            const slides = [...scroll.querySelectorAll('.galeri-slide')];
            if(!slides.length) return;
            const scrollRect = scroll.getBoundingClientRect();
            const center = scroll.scrollLeft + scroll.clientWidth/2;
            let best = 0, bestDist = Infinity;
            slides.forEach((el, i)=>{
                const elRect = el.getBoundingClientRect();
                const elCenter = el.offsetLeft + el.offsetWidth/2;
                const dist = Math.abs(elCenter - center);
                if(dist < bestDist){ bestDist = dist; best = i; }
            });
               // Apply 3D only to the center (best) slide; others stay subtle
               const maxAngle = 30; // stronger side tilt for depth
               slides.forEach((el, i)=>{
                   const elCenter = el.offsetLeft + el.offsetWidth/2;
                   const ratio = Math.max(-1, Math.min(1, (elCenter - center) / (scroll.clientWidth/2))); // -1..1
                   if (i === best) {
                       const angle = '0deg';
                       const depth = '10px';
                       const scale = '1.18';
                       el.style.setProperty('--ry', angle);
                       el.style.setProperty('--z', depth);
                       el.style.setProperty('--s', scale);
                       el.style.setProperty('--scale', scale);
                       el.style.transform = `translateZ(${depth}) rotateY(${angle}) scale(${scale})`;
                       el.style.zIndex = '3';
                       el.style.filter = 'none';
                   } else {
                       const angle = ((-ratio) * maxAngle).toFixed(2) + 'deg';
                       const depth = '0px';
                       const scale = '0.88';
                       el.style.setProperty('--ry', angle);
                       el.style.setProperty('--z', depth);
                       el.style.setProperty('--s', scale);
                       el.style.setProperty('--scale', scale);
                       el.style.transform = `translateZ(${depth}) rotateY(${angle}) scale(${scale})`;
                       el.style.zIndex = '1';
                       el.style.filter = 'brightness(0.96) saturate(0.94)';
                   }
                   el.classList.toggle('is-active', i===best);
               });
        }
        scroll && scroll.addEventListener('scroll', ()=>{ window.requestAnimationFrame(updateActiveSlide); });
        window.addEventListener('resize', ()=>{ window.requestAnimationFrame(updateActiveSlide); });
        // Infinite-like wrap: when nearing ends, jump to the other side seamlessly
        // Guard to avoid recursive scroll handling during loop adjustments
        let _isLoopAdjust = false; let _suppressSnap = false;
        function _getStep(){
            const firstSlide = scroll && scroll.querySelector('.galeri-slide');
            const baseW = firstSlide ? firstSlide.offsetWidth : 300; // stable, unaffected by CSS transforms
            const cs = scroll ? getComputedStyle(scroll) : null;
            const gapPx = cs ? parseFloat(cs.gap || cs.columnGap || '0') : 0;
            return baseW + (isNaN(gapPx) ? 0 : gapPx);
        }
        function ensureLoop(direction){
            if(!scroll || _isLoopAdjust) return;
            const slides = scroll.querySelectorAll('.galeri-slide');
            if(slides.length < 3) return; // not enough items to loop safely
            const first = slides[0];
            const last = slides[slides.length - 1];
            const step = _getStep();
            // If scrolled near left start and going left, move last to front
            if(direction === 'left' && scroll.scrollLeft <= step/2){
                _isLoopAdjust = true;
                const prevBehavior = scroll.style.scrollBehavior;
                scroll.style.scrollBehavior = 'auto';
                scroll.insertBefore(last, first);
                scroll.scrollLeft += step; // compensate DOM shift
                scroll.style.scrollBehavior = prevBehavior;
                // Delay update to allow DOM to settle
                setTimeout(() => {
                    updateActiveSlide(true);
                    _isLoopAdjust = false;
                }, 50);
            }
            // If scrolled near right end and going right, move first to end
            if(direction === 'right' && scroll.scrollWidth - scroll.clientWidth - scroll.scrollLeft <= step/2){
                _isLoopAdjust = true;
                const prevBehavior = scroll.style.scrollBehavior;
                scroll.style.scrollBehavior = 'auto';
                scroll.appendChild(first);
                scroll.scrollLeft -= step; // compensate DOM shift
                scroll.style.scrollBehavior = prevBehavior;
                // Delay update to allow DOM to settle
                setTimeout(() => {
                    updateActiveSlide(true);
                    _isLoopAdjust = false;
                }, 50);
            }
        }

        // Center slide helper for button handlers (outer scope)
        function _centerSlideBtn(el){
            if(!scroll || !el) return;
            const elCenter = el.offsetLeft + el.offsetWidth/2;
            const targetLeft = elCenter - scroll.clientWidth/2;
            scroll.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }

        prevBtn && prevBtn.addEventListener('click', ()=>{
            if(!scroll || _isLoopAdjust) return;
            _suppressSnap = true;
            ensureLoop('left');
            const slides = [...scroll.querySelectorAll('.galeri-slide')];
            if(!slides.length) return;
            const currentEl = _nearestSlideEl();
            const activeIdx = Math.max(0, slides.indexOf(currentEl));
            const targetIdx = (activeIdx - 1 + slides.length) % slides.length;
            const target = slides[targetIdx];
            _centerSlideBtn(target);
            // Wait for scroll to settle, then re-enable snap
            setTimeout(() => {
                _suppressSnap = false;
                updateActiveSlide(true);
            }, 300);
        });
        nextBtn && nextBtn.addEventListener('click', ()=>{
            if(!scroll || _isLoopAdjust) return;
            _suppressSnap = true;
            ensureLoop('right');
            const slides = [...scroll.querySelectorAll('.galeri-slide')];
            if(!slides.length) return;
            const currentEl = _nearestSlideEl();
            const activeIdx = Math.max(0, slides.indexOf(currentEl));
            const targetIdx = (activeIdx + 1) % slides.length;
            const target = slides[targetIdx];
            _centerSlideBtn(target);
            // Wait for scroll to settle, then re-enable snap
            setTimeout(() => {
                _suppressSnap = false;
                updateActiveSlide(true);
            }, 300);
        });

        // Also loop on manual scroll when reaching edges and add gentle snap-to-center
        let _snapTimer = null;
        function _nearestSlideEl(){
            if(!scroll) return null;
            const slides = [...scroll.querySelectorAll('.galeri-slide')];
            if(!slides.length) return null;
            const center = scroll.scrollLeft + scroll.clientWidth/2;
            let best = slides[0];
            let bestDist = Infinity;
            slides.forEach(el => {
                const elCenter = el.offsetLeft + el.offsetWidth/2;
                const dist = Math.abs(elCenter - center);
                if (dist < bestDist) { bestDist = dist; best = el; }
            });
            return best;
        }
        function _snapToNearest(immediate=false){
            if (_isLoopAdjust) return; // Don't snap during loop adjustments
            const el = _nearestSlideEl();
            if (!el) return;
            const elCenter = el.offsetLeft + el.offsetWidth/2;
            const targetLeft = elCenter - scroll.clientWidth/2;
            scroll.scrollTo({ left: targetLeft, behavior: immediate ? 'auto' : 'smooth' });
        }
        scroll && scroll.addEventListener('scroll', ()=>{
            if (_isLoopAdjust) return; // Skip during loop adjustments
            const prevLeft = scroll._prevLeft ?? scroll.scrollLeft;
            const dir = scroll.scrollLeft < prevLeft ? 'left' : 'right';
            scroll._prevLeft = scroll.scrollLeft;
            ensureLoop(dir);
            updateActiveSlide(); // Update transforms during scroll
            // Skip auto-snap while button-driven scroll is running
            if (_suppressSnap) return;
            if (_snapTimer) clearTimeout(_snapTimer);
            _snapTimer = setTimeout(()=>_snapToNearest(false), 100); // Increased delay for stability
        }, {passive:true});
        // Snap immediately after gesture ends, unless button-driven
        scroll && scroll.addEventListener('touchend', ()=>{
            if (_suppressSnap || _isLoopAdjust) return;
            if (_snapTimer) clearTimeout(_snapTimer);
            _snapTimer = setTimeout(()=>_snapToNearest(true), 50);
        }, {passive:true});
        scroll && scroll.addEventListener('wheel', ()=>{
            if (_suppressSnap || _isLoopAdjust) return;
            if (_snapTimer) clearTimeout(_snapTimer);
            _snapTimer = setTimeout(()=>_snapToNearest(true), 100);
        }, {passive:true});

        loadMoreBtn && loadMoreBtn.addEventListener('click', ()=>{
            shown = Math.min(shown + 8, filtered.length);
            renderGrid();
        });

        function open(i){
            const it = items[i];
            if(!it) return;
            media.innerHTML = it.type === 'video'
                ? `<video src="${it.src}" controls autoplay playsinline></video>`
                : `<img src="${it.src}" alt="${it.title}">`;
            desc.innerHTML = `
                <h3>${it.title}</h3>
                <div class="galeri-meta">${(it.tags||[]).map(t=>`<span class="galeri-tag">${t}</span>`).join('')}</div>
                <p>${it.desc}</p>
            `;
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
        }
        function close(){
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden','true');
            media.innerHTML = '';
            document.body.style.overflow = '';
        }

        backBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
        document.addEventListener('keydown', (e)=>{ if(overlay.classList.contains('open') && e.key==='Escape') close(); });

        // init
        applyFilter('Semua');
    })();

});
=======

    })();


    // Initialize carousel when page loads
    new Gallery3D();

});

// Image Grid Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Grid items data with descriptions
    const gridItemsData = [
        {
            id: 1,
            imgSrc: "asset2/WhatsApp Image 2025-08-19 at 20.18.00_be7aa69c.jpg",
            title: "Pantai Mandala Ria",
            description: " "
        },
        {
            id: 2,
            title: "Batu Tongkarraya",
            description: " "
        },
        {
            id: 3,
            title: "Laut Mandala Ria",
            description: " "
        },
        {
            id: 4,
            title: "Tebing Mattoanging",
            description: " "
        },
        {
            id: 5,
            title: "Pantai Mandala Ria",
            description: " "
        },
        {
            id: 6,
            title: "Gua Passea",
            description: " "
        },
        {
            id: 7,
            title: "Pantai Mandala Ria",
            description: ""
        },
        {
            id: 8,
            title: "Tebing Mattoanging",
            description: " "
        },
        {
            id: 9,
            title: "Tebing Mattoanging",
            description: ""
        }
    ];

    // Additional items for "Load More" functionality
    const additionalItems = [
        {
            id: 10,
            size: "wide",
            imgSrc: "asset/img/wisata andalah/gua-passea-2.jpg",
            title: "Gua Passea",
            description: " "
        },
        {
            id: 11,
            size: "wide-a",
            imgSrc: "asset/img/wisata andalah/pantai-mandala-8.jpg",
            title: "Pantai Mandala",
            description: " "
        },
        {
            id: 12,
            size: "large",
            imgSrc: "asset/img/wisata andalah/batu-tongkarayya-2.jpg",
            title: "Batu Tongkarayya",
            description: ""
        },
        {
            id: 13,
            size: "medium",
            imgSrc: "asset/img/wisata andalah/pantai-mandala-9.jpeg",
            title: " ",
            description: " "
        },
        {
            id: 14,
            size: "medium",
            imgSrc: "asset/img/wisata andalah/pantai-mandala-6.webp",
            title: " ",
            description: " "
        },
        {
            id: 15,
            size: "medium",
            imgSrc: "asset2/WhatsApp Image 2025-08-20 at 12.40.59.jpeg",
            title: " ",
            description: " "
        }
    ];

    // Get DOM elements
    const imageGrid = document.querySelector('.image-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const seeLessBtn = document.getElementById('seeLessBtn');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.image-modal-close');

    // Skip if elements don't exist (in case this script runs on other pages)
    if (!imageGrid || !loadMoreBtn || !seeLessBtn || !imageModal) return;

    // Flag to track if additional items are loaded
    let additionalItemsLoaded = false;

    // Open modal when clicking on a grid item
    imageGrid.addEventListener('click', function(e) {
        const gridItem = e.target.closest('.grid-item');
        if (gridItem) {
            const itemId = parseInt(gridItem.dataset.id);
            const itemData = [...gridItemsData, ...additionalItems].find(item => item.id === itemId);

            if (itemData) {
                const img = gridItem.querySelector('img');
                if (img) {
                    // Open image modal
                    modalImage.src = img.src;
                    modalTitle.textContent = itemData.title;
                    modalDescription.textContent = itemData.description;

                    imageModal.style.display = 'block';
                    setTimeout(() => {
                        imageModal.classList.add('show');
                    }, 10);

                    document.body.style.overflow = 'hidden';
                } else {
                    const video = gridItem.querySelector('video');
                    if (video) {
                        // Open video modal
                        videoPlayer.src = video.src;
                        openVideoModal();
                    }
                }
            }
        }
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    function closeModal() {
        imageModal.classList.remove('show');
        setTimeout(() => {
            imageModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Load more items
    loadMoreBtn.addEventListener('click', function() {
        if (!additionalItemsLoaded) {
            additionalItems.forEach(item => {
                const gridItem = document.createElement('div');
                gridItem.className = `grid-item ${item.size}`;
                gridItem.dataset.id = item.id;
                
                gridItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.title}">
                    <div class="grid-item-overlay">
                        <h3>${item.title}</h3>
                        <p>Click to view details</p>
                    </div>
                `;
                
                imageGrid.appendChild(gridItem);
            });
            
            additionalItemsLoaded = true;
            loadMoreBtn.style.display = 'none';
            seeLessBtn.style.display = 'block';
        }
    });

    // See less (remove additional items)
    seeLessBtn.addEventListener('click', function() {
        if (additionalItemsLoaded) {
            const items = imageGrid.querySelectorAll('.grid-item');
            for (let i = items.length - 1; i >= items.length - additionalItems.length; i--) {
                items[i].remove();
            }
            
            additionalItemsLoaded = false;
            seeLessBtn.style.display = 'none';
            loadMoreBtn.style.display = 'block';
        }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            closeModal();
        }
    });

    // Video Modal logic
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoClose = document.getElementById('videoClose');
    const openVideoModalBtn = document.getElementById('openVideoModal');

    function openVideoModal() {
        videoModal.classList.add('open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        videoPlayer.play();
    }

    function closeVideoModal() {
        videoModal.classList.remove('open');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = '';
    }

    if (openVideoModalBtn) {
        openVideoModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openVideoModal();
        });
    }

    if (videoClose) {
        videoClose.addEventListener('click', closeVideoModal);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('open')) {
            closeVideoModal();
        }
    });
});
>>>>>>> 47ab2a45161137ec494a1bd69b920964237f652a
