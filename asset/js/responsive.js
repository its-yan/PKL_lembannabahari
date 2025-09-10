document.addEventListener('DOMContentLoaded', () => {
  const navAtas = document.querySelector('.nav-atas');
  const hamburger = document.querySelector('.hamburger');
  const menuList = document.querySelector('.menu-list');

  // Define submenu content for each menu item
  const menuSubmenuData = {
    'Profil Desa, href: profil.html': [
      { text: 'Data Desa', href: '#data-desa' },
      { text: 'Sejarah', href: '#sejarah' },
      { text: 'Visi Misi', href: '#visi-misi' },
      { text: 'Struktur Organisasi', href: '#struktur-organisasi' }
    ]
  };

  // Function to create submenu HTML
  function createSubmenuHTML(menuItems) {
    if (!menuItems || menuItems.length === 0) return '';
    
    const submenuItems = menuItems.map(item => 
      `<li><a href="${item.href}">${item.text}</a></li>`
    ).join('');
    
    return `<ul class="mobile-submenu">${submenuItems}</ul>`;
  }

  // Function to add dropdown functionality to all menu items (mobile/tablet only)
  function addDropdownFunctionality() {
    const menuItems = menuList.querySelectorAll('li');
    
    menuItems.forEach(li => {
      const mainLink = li.querySelector('a');
      if (!mainLink) return;
      
      const menuText = mainLink.textContent.trim();
      const submenuData = menuSubmenuData[menuText];
      
      if (!submenuData) return; // Skip if no submenu data available
      
      // Check if submenu already exists to avoid duplicating
      if (li.querySelector('.mobile-submenu, .submenu, #profilSubmenu')) return;
      
      // Create submenu for all menu items including Profil Desa
      const submenuHTML = createSubmenuHTML(submenuData);
      li.innerHTML = mainLink.outerHTML + submenuHTML;
      
      // Add appropriate class
      if (menuText === 'Profil Desa') {
        li.classList.add('has-submenu');
      } else {
        li.classList.add('has-mobile-submenu');
      }
    });
  }

  // Function to remove mobile dropdown functionality (but preserve original submenus)
  function removeDropdownFunctionality() {
    // Only remove mobile-added submenus, keep original ones like Profil Desa
    const mobileMenuItems = menuList.querySelectorAll('li.has-mobile-submenu');
    mobileMenuItems.forEach(li => {
      const mainLink = li.querySelector('a');
      const mobileSubmenu = li.querySelector('.mobile-submenu');
      if (mobileSubmenu) {
        mobileSubmenu.remove();
      }
      li.classList.remove('has-mobile-submenu', 'open');
      li.innerHTML = mainLink.outerHTML;
    });
    
    // For Profil Desa, just remove the submenu but keep the class structure
    const profilDesaItem = Array.from(menuList.querySelectorAll('li')).find(li => {
      const link = li.querySelector('a');
      return link && link.textContent.trim() === 'Profil Desa';
    });
    
    if (profilDesaItem && !isMobileTabletView()) {
      const mainLink = profilDesaItem.querySelector('a');
      const submenu = profilDesaItem.querySelector('.mobile-submenu');
      if (submenu) {
        submenu.remove();
      }
      profilDesaItem.classList.remove('open');
      // Reset to original structure for desktop
      profilDesaItem.innerHTML = mainLink.outerHTML;
      profilDesaItem.classList.add('has-submenu'); // Keep the class for styling
    }
    
    // Close any open submenus
    document
      .querySelectorAll('.menu-list > li.open')
      .forEach(li => li.classList.remove('open'));
  }

  // Check if we're in mobile/tablet view
  function isMobileTabletView() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  // Initialize dropdown functionality based on screen size
  function initializeDropdowns() {
    if (isMobileTabletView()) {
      addDropdownFunctionality();
    } else {
      removeDropdownFunctionality();
    }
  }

  // Toggle panel hamburger
  hamburger.addEventListener('click', () => {
    navAtas.classList.toggle('show-menu');
    
    // Initialize dropdowns when menu is opened
    if (navAtas.classList.contains('show-menu') && isMobileTabletView()) {
      setTimeout(() => {
        initializeDropdowns();
        // Ensure all menu items are visible
        const menuItems = menuList.querySelectorAll('li');
        menuItems.forEach(li => {
          li.style.display = 'block';
        });
      }, 10);
    }
    
    // Close all submenus when panel is closed
    if (!navAtas.classList.contains('show-menu')) {
      document
        .querySelectorAll('.menu-list > li.open')
        .forEach(li => li.classList.remove('open'));
    }
  });

  // Close hamburger menu when a menu item is clicked and navigate
  const closeMenuOnClick = (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    // Only handle clicks inside the hamburger menu when it is open
    if (!navAtas.classList.contains('show-menu')) return;

    // Close the hamburger menu
    navAtas.classList.remove('show-menu');
  };

  menuList.addEventListener('click', closeMenuOnClick);

  // Also handle mobile menu list
  const mobileMenuList = document.querySelector('.mobile-menu-list');
  if (mobileMenuList) {
    mobileMenuList.addEventListener('click', closeMenuOnClick);
  }

  // Delegation: toggle submenu (mobile/tablet and desktop)
  menuList.addEventListener('click', (e) => {
    // Check if the click is on a dropdown toggle button
    if (e.target.classList.contains('dropdown-toggle')) {
      const li = e.target.closest('li');
      if (!li) return;
      e.preventDefault();
      e.stopPropagation();

      // Toggle open class on li
      li.classList.toggle('open');

      // Toggle open class on button for arrow rotation
      e.target.classList.toggle('open');

      // Close other open menus except this one
      document
        .querySelectorAll('.menu-list > li.open')
        .forEach(other => {
          if (other !== li) {
            other.classList.remove('open');
            const btn = other.querySelector('.dropdown-toggle.open');
            if (btn) btn.classList.remove('open');
          }
        });
      return;
    }

    const a = e.target.closest('.menu-list > li > a');
    if (!a) return;

    const li = a.parentElement;
    const isMobile = isMobileTabletView() || navAtas.classList.contains('show-menu');

    if (!isMobile) {
      // For desktop, if clicking on a with submenu, toggle submenu instead of navigating
      const hasSubmenu = li.classList.contains('has-submenu') ||
                        li.classList.contains('has-mobile-submenu') ||
                        li.querySelector('.submenu, .mobile-submenu');

      if (hasSubmenu) {
        e.preventDefault();
        e.stopPropagation();

        // Close other open menus
        document
          .querySelectorAll('.menu-list > li.open')
          .forEach(other => {
            if (other !== li) other.classList.remove('open');
          });

        // Toggle current menu
        li.classList.toggle('open');
        return;
      }
      // If no submenu, let the link work normally
      return;
    }

    // Mobile/tablet behavior
    // Check if this menu item has submenu (either existing or mobile-added)
    const hasSubmenu = li.classList.contains('has-submenu') ||
                      li.classList.contains('has-mobile-submenu') ||
                      li.querySelector('.submenu, .mobile-submenu');

    if (!hasSubmenu) return; // Let links without submenus work normally

    e.preventDefault();
    e.stopPropagation();

    // Close other open menus (optional - remove this if you want multiple menus open)
    document
      .querySelectorAll('.menu-list > li.open')
      .forEach(other => {
        if (other !== li) other.classList.remove('open');
      });

    // Toggle current menu
    li.classList.toggle('open');
  });

  // Click outside nav: close panel + submenus
  document.addEventListener('click', (e) => {
    if (!navAtas.contains(e.target)) {
      navAtas.classList.remove('show-menu');
      document
        .querySelectorAll('.menu-list > li.open')
        .forEach(li => li.classList.remove('open'));
    }
  });

  // Handle resize events
  window.addEventListener('resize', () => {
    const wasDesktop = !isMobileTabletView();
    
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
      initializeDropdowns();
      
      // Reset states when switching to desktop
      if (!isMobileTabletView()) {
        navAtas.classList.remove('show-menu');
        document
          .querySelectorAll('.menu-list > li.open')
          .forEach(li => li.classList.remove('open'));
      }
    }, 150);
  });

  // Initialize on load
  initializeDropdowns();

  // Re-initialize dropdowns when menu is shown (in case of dynamic content)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'class' && 
          mutation.target === navAtas) {
        if (navAtas.classList.contains('show-menu') && isMobileTabletView()) {
          // Small delay to ensure menu is fully rendered
          setTimeout(initializeDropdowns, 10);
        }
      }
    });
  });

  observer.observe(navAtas, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// =============================================
// ULTRA-MODERN BOTTOM NAVIGATION
// =============================================
class ModernBottomNav {
  constructor() {
    this.navItems = document.querySelectorAll('.mobile-nav-item');
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  init() {
    this.setActiveState();
    this.bindEvents();
    this.enableAnimations();
  }

  getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'profil.html';
    return path.replace('.html', '');
  }

  setActiveState() {
    this.navItems.forEach(item => {
      const page = item.dataset.page;
      if (page === this.currentPage || (this.currentPage === '' && page === 'profil')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  bindEvents() {
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => this.handleNavClick(e, item));
      item.addEventListener('touchstart', (e) => this.handleTouchStart(e, item), { passive: true });
    });
  }

  handleNavClick(e, item) {
    e.preventDefault();

    // Add ripple effect
    this.addRippleEffect(item);

    // Update active state
    this.updateActiveState(item);

    // Handle navigation
    const page = item.dataset.page;
    this.navigateToPage(page);

    // Haptic feedback simulation
    this.simulateHapticFeedback();
  }

  handleTouchStart(e, item) {
    // Add subtle scale effect on touch
    item.style.transform = item.classList.contains('active')
      ? 'translateY(-8px) scale(1.05)'
      : 'translateY(-2px) scale(0.98)';

    setTimeout(() => {
      item.style.transform = '';
    }, 150);
  }

  addRippleEffect(item) {
    item.classList.add('ripple');
    setTimeout(() => {
      item.classList.remove('ripple');
    }, 400);
  }

  updateActiveState(item) {
    this.navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  }

  navigateToPage(page) {
    const routes = {
      'beranda': '#',
      'profil': 'profil.html',
      'wisata': 'wisata.html',
      'layanan': 'Layanan.html',
      'berita': '#'
    };

    if (page === 'berita') {
      this.showMoreMenu();
    } else if (routes[page]) {
      // Smooth page transition
      document.body.style.opacity = '0.7';
      setTimeout(() => {
        if (routes[page] !== '#') {
          window.location.href = routes[page];
        }
      }, 200);
    }
  }

  showMoreMenu() {
    // Create modern modal for more options
    const modal = document.createElement('div');
    modal.className = 'more-modal';
    modal.innerHTML = `
      <div class="more-modal-content">
        <h3>Berita & Informasi</h3>
        <div class="more-options">
          <a href="#" class="more-option">Berita Terbaru</a>
          <a href="#" class="more-option">Pengumuman</a>
          <a href="#" class="more-option">Agenda</a>
          <a href="#" class="more-option">Galeri</a>
        </div>
        <button class="close-modal">Tutup</button>
      </div>
    `;

    // Add modal styles
    const modalStyles = `
      .more-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }
      .more-modal-content {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(40px);
        border-radius: 25px;
        padding: 30px;
        max-width: 300px;
        width: 90%;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      .more-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 20px 0;
      }
      .more-option {
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .more-option:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
      .close-modal {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(modal);

    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      modal.remove();
      styleSheet.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        styleSheet.remove();
      }
    });
  }

  simulateHapticFeedback() {
    // Vibration API for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  enableAnimations() {
    // Intersection Observer for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    });

    this.navItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on mobile devices
  if (window.matchMedia('(max-width: 600px)').matches) {
    new ModernBottomNav();
  }
});

// Performance optimization - disable animations on low-end devices
if (navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4) {
  document.documentElement.style.setProperty('--transition-smooth', '0.2s ease');
  document.documentElement.style.setProperty('--transition-bounce', '0.2s ease');
}
