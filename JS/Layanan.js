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
});