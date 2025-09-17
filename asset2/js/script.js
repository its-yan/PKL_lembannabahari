document.addEventListener('DOMContentLoaded', function() {
    // Initialize floating cards animation delays
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        const delay = card.getAttribute('data-delay') || `${1 + (index * 0.2)}s`;
        card.style.setProperty('--delay', delay);
    });
    
    // Parallax effect for header
    const headerContainer = document.querySelector('.header-container');
    
    window.addEventListener('scroll', () => {
        if (headerContainer) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            headerContainer.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // Map markers interaction
    const mapMarkers = document.querySelectorAll('.map-marker');
    const facilityItems = document.querySelectorAll('.facility-list li[data-marker]');
    
    // Highlight facility item when hovering over marker
    mapMarkers.forEach(marker => {
        const markerId = marker.getAttribute('data-id');
        
        marker.addEventListener('mouseenter', () => {
            const matchingItem = document.querySelector(`.facility-list li[data-marker="${markerId}"]`);
            if (matchingItem) {
                matchingItem.classList.add('highlight');
                matchingItem.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                matchingItem.style.transform = 'translateX(8px)';
                matchingItem.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                
                // Highlight the marker in the facility list
                const facilityMarker = matchingItem.querySelector('.facility-marker');
                if (facilityMarker) {
                    facilityMarker.style.transform = 'scale(1.3)';
                    facilityMarker.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                }
                
                // Scroll the facility into view if needed
                const facilityPane = document.querySelector('.facilities-pane');
                if (facilityPane) {
                    const itemRect = matchingItem.getBoundingClientRect();
                    const paneRect = facilityPane.getBoundingClientRect();
                    
                    if (itemRect.top < paneRect.top || itemRect.bottom > paneRect.bottom) {
                        matchingItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
        
        marker.addEventListener('mouseleave', () => {
            const matchingItem = document.querySelector(`.facility-list li[data-marker="${markerId}"]`);
            if (matchingItem) {
                matchingItem.classList.remove('highlight');
                matchingItem.style.backgroundColor = '';
                matchingItem.style.transform = '';
                matchingItem.style.boxShadow = '';
                
                // Reset the marker in the facility list
                const facilityMarker = matchingItem.querySelector('.facility-marker');
                if (facilityMarker) {
                    facilityMarker.style.transform = '';
                    facilityMarker.style.boxShadow = '';
                }
            }
        });
    });
    
    // Highlight marker when hovering over facility item
    facilityItems.forEach(item => {
        const markerId = item.getAttribute('data-marker');
        
        item.addEventListener('mouseenter', () => {
            const matchingMarker = document.querySelector(`.map-marker[data-id="${markerId}"]`);
            if (matchingMarker) {
                matchingMarker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                matchingMarker.style.zIndex = '30';
                matchingMarker.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
                matchingMarker.style.animationPlayState = 'paused';
                
                // Show tooltip
                const tooltip = matchingMarker.querySelector('.marker-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
                }
                
                // Highlight the facility marker
                const facilityMarker = item.querySelector('.facility-marker');
                if (facilityMarker) {
                    facilityMarker.style.transform = 'scale(1.3)';
                    facilityMarker.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                }
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const matchingMarker = document.querySelector(`.map-marker[data-id="${markerId}"]`);
            if (matchingMarker) {
                matchingMarker.style.transform = '';
                matchingMarker.style.zIndex = '';
                matchingMarker.style.boxShadow = '';
                matchingMarker.style.animationPlayState = '';
                
                // Hide tooltip
                const tooltip = matchingMarker.querySelector('.marker-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '';
                    tooltip.style.visibility = '';
                    tooltip.style.transform = '';
                }
                
                // Reset the facility marker
                const facilityMarker = item.querySelector('.facility-marker');
                if (facilityMarker) {
                    facilityMarker.style.transform = '';
                    facilityMarker.style.boxShadow = '';
                }
            }
        });
        
        // Add click functionality to scroll the map to show the marker
        item.addEventListener('click', () => {
            const matchingMarker = document.querySelector(`.map-marker[data-id="${markerId}"]`);
            if (matchingMarker) {
                // Trigger a more pronounced animation
                matchingMarker.style.transform = 'translate(-50%, -50%) scale(1.5)';
                matchingMarker.style.zIndex = '50';
                matchingMarker.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.6)';
                
                // Show tooltip
                const tooltip = matchingMarker.querySelector('.marker-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
                }
                
                // Scroll the map pane to show the marker
                const mapImage = document.querySelector('.map-image');
                if (mapImage) {
                    mapImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Reset after a delay
                setTimeout(() => {
                    matchingMarker.style.transform = '';
                    matchingMarker.style.zIndex = '';
                    matchingMarker.style.boxShadow = '';
                    
                    if (tooltip) {
                        tooltip.style.opacity = '';
                        tooltip.style.visibility = '';
                        tooltip.style.transform = '';
                    }
                }, 2000);
            }
        });
    });

    // Smooth scrolling for navigation links (only anchors) and close menu on click
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const isAnchor = href && href.startsWith('#');
            if (isAnchor) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Always close mobile menu after navigating
            if (typeof closeMenu === 'function') closeMenu();
        });
    });


    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = ''; // Empty, we'll use CSS ::after for the arrow
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('title', 'Kembali ke atas');
    document.body.appendChild(scrollToTopBtn);

    // Throttled scroll listener for better performance
    let scrollThrottleTimeout;
    window.addEventListener('scroll', function() {
        if (scrollThrottleTimeout) {
            clearTimeout(scrollThrottleTimeout);
        }
        
        scrollThrottleTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                if (!scrollToTopBtn.classList.contains('show')) {
                    scrollToTopBtn.classList.remove('hide');
                    scrollToTopBtn.classList.add('show');
                    scrollToTopBtn.style.display = 'block';
                }
            } else {
                if (scrollToTopBtn.classList.contains('show')) {
                    scrollToTopBtn.classList.remove('show');
                    scrollToTopBtn.classList.add('hide');
                    // Hide after animation completes
                    setTimeout(() => {
                        if (scrollToTopBtn.classList.contains('hide')) {
                            scrollToTopBtn.style.display = 'none';
                            scrollToTopBtn.classList.remove('hide');
                        }
                    }, 400);
                }
            }
        }, 10);
    });

    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click effect
        this.style.transform = 'translateY(-2px) scale(0.95) translateZ(0)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hamburger menu + overlay + sticky nav
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navWrapper = document.querySelector('.nav-wrapper');

    // Create overlay if not exists
    let navOverlay = document.getElementById('navOverlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.id = 'navOverlay';
        document.body.appendChild(navOverlay);
    }

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        navOverlay.classList.toggle('show', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        navMenu.setAttribute('aria-hidden', String(!isOpen));
    }

    function closeMenu() {
        navMenu.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
        document.body.classList.remove('menu-open');
        navOverlay.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }

    // Init ARIA
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-controls', 'primary-navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.id = navMenu.id || 'primary-navigation';
    navMenu.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // ENHANCED SMOOTH STICKY NAV WITH TRANSITION STATES
    let isTransitioning = false;
    let ticking = false;
    
    const updateSticky = () => {
        if (isTransitioning) return; // Prevent rapid-fire transitions
        
        const headerHeight = headerContainer ? headerContainer.offsetHeight : 0;
        const scrollThreshold = Math.max(10, headerHeight - 80);
        const shouldStick = window.scrollY > scrollThreshold;
        const isCurrentlySticky = navWrapper && navWrapper.classList.contains('nav-sticky');
        
        if (shouldStick && !isCurrentlySticky) {
            // SMOOTH ENTRANCE TO STICKY
            isTransitioning = true;
            navWrapper && navWrapper.classList.add('nav-sticky');
            
            // Performance optimization: Use reduced motion duration on mobile
            const duration = window.innerWidth <= 900 ? 400 : 600;
            setTimeout(() => { isTransitioning = false; }, duration);
            
        } else if (!shouldStick && isCurrentlySticky) {
            // SMOOTH EXIT FROM STICKY
            isTransitioning = true;
            navWrapper && navWrapper.classList.remove('nav-sticky');
            
            // Performance optimization: Use reduced motion duration on mobile
            const duration = window.innerWidth <= 900 ? 300 : 500;
            setTimeout(() => { isTransitioning = false; }, duration);
        }
    };
    
    // PERFORMANCE OPTIMIZED SCROLL HANDLER
    const requestStickyUpdate = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateSticky();
                ticking = false;
            });
            ticking = true;
        }
    };
    updateSticky();
    window.addEventListener('scroll', requestStickyUpdate);

    // Active link highlighting on scroll
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

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // CTA Section Enhancements
    const ctaButtons = document.querySelectorAll('.cta-btn');
    const ctaImageItems = document.querySelectorAll('.cta-image-item');

    // Add smooth scrolling for CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add enhanced hover effects for CTA images
    ctaImageItems.forEach((item, index) => {
        // Add stagger animation on load
        item.style.animationDelay = `${index * 0.15}s`;
        item.classList.add('cta-image-animate');

        // Mouse events for desktop
        item.addEventListener('mouseenter', () => {
            if (!isTouchDevice()) {
                addRippleEffect(item);
                addSubtleBounceToOthers(index);
            }
        });

        item.addEventListener('mouseleave', () => {
            if (!isTouchDevice()) {
                resetOtherImages(index);
            }
        });

        // Touch events for mobile
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            addRippleEffect(item);
            item.classList.add('cta-touch-active');
        });

        item.addEventListener('touchend', () => {
            setTimeout(() => {
                item.classList.remove('cta-touch-active');
            }, 150);
        });
    });

    // Helper functions
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function addRippleEffect(item) {
        const ripple = document.createElement('div');
        ripple.className = 'cta-ripple';
        item.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    function addSubtleBounceToOthers(currentIndex) {
        ctaImageItems.forEach((otherItem, otherIndex) => {
            if (otherIndex !== currentIndex) {
                otherItem.style.transform = otherItem.style.transform + ' scale(0.98)';
                otherItem.style.transition = 'all 0.3s ease';
            }
        });
    }

    function resetOtherImages(currentIndex) {
        ctaImageItems.forEach((otherItem, otherIndex) => {
            if (otherIndex !== currentIndex) {
                otherItem.style.transform = otherItem.style.transform.replace(' scale(0.98)', '');
            }
        });
    }

    // CTA Section scroll animation
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the animate-in class to trigger all animations
                    entry.target.classList.add('animate-in');
                    
                    // Add a subtle bounce effect to the wave container
                    const ctaWaves = entry.target.querySelector('.cta-waves');
                    if (ctaWaves) {
                        // disabled to prevent jitter
                        ctaWaves.style.animation = 'none';
                        ctaWaves.style.animationDelay = '0s';
                    }
                    
                    // Add stagger effect to buttons
                    const ctaButtons = entry.target.querySelectorAll('.cta-btn');
                    ctaButtons.forEach((button, index) => {
                        button.style.animationDelay = `${0.8 + (index * 0.1)}s`;
                    });
                    
                    // Disconnect observer after animation to prevent re-triggering
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        ctaObserver.observe(ctaSection);
    }

    // Carousel Modal
    const modal = document.getElementById('carousel-modal');
    const carouselInner = document.querySelector('.carousel-inner');
    const featureShapes = document.querySelectorAll('.feature-shape');
    const closeModal = document.querySelector('.close-carousel');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    let currentIndex = 0;
    let items = [];

    featureShapes.forEach(shape => {
        shape.addEventListener('click', () => {
            const images = shape.dataset.images.split(',');
            items = images;
            carouselInner.innerHTML = '';
            images.forEach(src => {
                const div = document.createElement('div');
                div.className = 'carousel-item';
                const img = document.createElement('img');
                img.src = src; // already prefixed in data-images
                div.appendChild(img);
                carouselInner.appendChild(div);
            });
            currentIndex = 0;
            updateCarousel();
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10); // Small delay to ensure the transition triggers
        });
    });

    function updateCarousel() {
        carouselInner.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function hideModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400); // Match the transition duration in CSS
    }

    closeModal.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            hideModal();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
});

// Add styles for the scroll to top button
const style = document.createElement('style');
style.innerHTML = `
    #scrollToTopBtn {
        display: none;
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 1000;
        border: none;
        outline: none;
        background: linear-gradient(135deg, #133E87 0%, #608BC1 50%, #0a2a5c 100%);
        color: white;
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        width: 55px;
        height: 55px;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 
            0 8px 25px rgba(19, 62, 135, 0.4),
            0 4px 12px rgba(19, 62, 135, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(15px) saturate(1.2);
        border: 2px solid rgba(255, 255, 255, 0.2);
        opacity: 0.9;
        transform: translateZ(0);
        will-change: transform, opacity, box-shadow;
    }

    #scrollToTopBtn:hover {
        background: linear-gradient(135deg, #608BC1 0%, #133E87 50%, #0a2a5c 100%);
        transform: translateY(-4px) scale(1.08) translateZ(0);
        box-shadow: 
            0 15px 40px rgba(19, 62, 135, 0.5),
            0 8px 20px rgba(19, 62, 135, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.2);
        opacity: 1;
        border-color: rgba(255, 255, 255, 0.3);
    }

    #scrollToTopBtn:active {
        transform: translateY(-2px) scale(1.05) translateZ(0);
        transition-duration: 0.1s;
        box-shadow: 
            0 8px 20px rgba(19, 62, 135, 0.6),
            0 4px 10px rgba(19, 62, 135, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    }

    #scrollToTopBtn::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    #scrollToTopBtn:hover::before {
        opacity: 1;
        animation: shimmer 2s ease-in-out infinite;
    }

    #scrollToTopBtn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        border: none;
        border-top: 3px solid currentColor;
        border-right: 3px solid currentColor;
        transform: translate(-50%, -30%) rotate(-45deg);
        transition: all 0.3s ease;
    }

    #scrollToTopBtn:hover::after {
        transform: translate(-50%, -35%) rotate(-45deg) scale(1.1);
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    }

    @keyframes shimmer {
        0% { 
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
        }
        50% { 
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
        }
        100% { 
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.8) translateZ(0);
        }
        to {
            opacity: 0.9;
            transform: translateY(0) scale(1) translateZ(0);
        }
    }

    @keyframes fadeOutDown {
        from {
            opacity: 0.9;
            transform: translateY(0) scale(1) translateZ(0);
        }
        to {
            opacity: 0;
            transform: translateY(10px) scale(0.9) translateZ(0);
        }
    }

    #scrollToTopBtn.show {
        display: block;
        animation: fadeInUp 0.5s ease-out forwards;
    }

    #scrollToTopBtn.hide {
        animation: fadeOutDown 0.4s ease-in forwards;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        #scrollToTopBtn {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            font-size: 18px;
        }
    }
`;
document.head.appendChild(style);
