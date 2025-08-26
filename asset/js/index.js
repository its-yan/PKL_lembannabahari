// Timeline interactivity placeholder

document.addEventListener('DOMContentLoaded', function () {
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

    document.querySelectorAll('.timeline-row').forEach(function(row) {
        observer.observe(row);
    });

    // Navbar floating logic
    const nav = document.querySelector('.profil-nav');
    const headerBg = document.querySelector('.header-bg');
    const navLinks = nav.querySelectorAll('a[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function updateNavPosition() {
        const headerBottom = headerBg.offsetTop + headerBg.offsetHeight;
        if (window.scrollY < headerBottom - nav.offsetHeight) {
            nav.style.position = 'absolute';
            nav.style.top = '470px';
            nav.style.left = '50%';
            nav.style.transform = 'translateX(-50%)';
            nav.style.width = '';
            nav.style.zIndex = '100';
        } else {
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.left = '50%';
            nav.style.transform = 'translateX(-50%)';
            nav.style.width = 'auto';
            nav.style.zIndex = '100';
        }
    }

    window.addEventListener('scroll', updateNavPosition);
    window.addEventListener('resize', updateNavPosition);
    updateNavPosition();

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
