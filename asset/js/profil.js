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

    // Medsos smooth entrance (Instagram big card + tiles)
    const medsosAnimEls = document.querySelectorAll('.ms-animate');
    medsosAnimEls.forEach(el => observer.observe(el));

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

    // =====================
    // PETA: Tabs, Reveal, Modal
    // =====================
    (function(){
        const tabPeta = document.getElementById('tabPeta');
        const tabEv = document.getElementById('tabEvakuasi');
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

        // Reveal on scroll khusus peta
        const ioPeta = new IntersectionObserver((entries)=>{
            entries.forEach(e=>{ if(e.isIntersecting) { e.target.classList.add('in'); ioPeta.unobserve(e.target);} });
        }, { threshold:.15 });
        document.querySelectorAll('#peta .reveal').forEach(el=>ioPeta.observe(el));

        // Modal gallery untuk peta
        const images = [
            'asset/img/profil-desa/peta.jpeg',
            'asset/img/profil-desa/Jalur-evakuasi.jpg'
        ];
        const modal = document.getElementById('mapModal');
        const stage = document.getElementById('mapStageImg');
        const counter = document.getElementById('mapCounter');
        const closeBtn = document.getElementById('mapClose');
        const prevBtn = document.getElementById('mapPrev');
        const nextBtn = document.getElementById('mapNext');
        let idx = 0;
        function update(){ if(stage && counter){ stage.src = images[idx]; counter.textContent = (idx+1)+' / '+images.length; } }
        function open(i){ if(!modal) return; idx = i; update(); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
        function close(){ if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
        function prev(){ idx = (idx-1+images.length)%images.length; update(); }
        function next(){ idx = (idx+1)%images.length; update(); }
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