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
        let animationSpeed = 15; // seconds
        
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

    // Add click handlers for card links
    const cardLinks = document.querySelectorAll('.card-link');
    
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get card information
            const card = this.closest('.promo-card, .recommendation-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            // You can add your custom logic here
            // For example, show a modal, navigate to detail page, etc.
            console.log('Card clicked:', { title, description });
            
            // Example: Show an alert (replace with your desired action)
            alert(`Anda mengklik: ${title}\n\n${description}`);
        });
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
});