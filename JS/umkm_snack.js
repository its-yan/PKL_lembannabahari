// Product data
const productData = {
    name: "Makanan Tradisional Desa",
    variants: {
        "paket-1": {
            name: "Paket A",
            description: "5 Jenis Makanan",
            price: 25000,
            originalPrice: 30000
        },
        "paket-2": {
            name: "Paket B",
            description: "8 Jenis Makanan",
            price: 35000,
            originalPrice: 40000
        },
        "paket-3": {
            name: "Paket C",
            description: "12 Jenis Makanan",
            price: 50000,
            originalPrice: 60000
        }
    },
    currentVariant: "paket-1"
};

// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbItems = document.querySelectorAll('.thumb-item');
const zoomBtn = document.getElementById('zoomBtn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const variantBtns = document.querySelectorAll('.variant-btn');
const quantityInput = document.getElementById('quantity');
const decreaseQty = document.getElementById('decreaseQty');
const increaseQty = document.getElementById('increaseQty');
const priceAmount = document.querySelector('.price-amount');
const priceCrossed = document.querySelector('.price-crossed');
const totalAmount = document.querySelector('.total-amount');
const orderBtn = document.getElementById('orderBtn');
const contactBtn = document.getElementById('contactBtn');
const orderModal = document.getElementById('orderModal');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');
const modalQty = document.getElementById('modalQty');
const modalTotal = document.getElementById('modalTotal');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const qrCode = document.getElementById('qrCode');

// Gallery functionality
let currentImageIndex = 0;
const images = Array.from(thumbItems).map(item => item.dataset.src);

function updateMainImage(src) {
    mainImage.src = src;
    lightboxImage.src = src;
}

function updateThumbnail(index) {
    thumbItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Thumbnail click handler
thumbItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        updateMainImage(item.dataset.src);
        updateThumbnail(index);
    });
});

// Lightbox functionality
function openLightbox() {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateMainImage(images[currentImageIndex]);
    updateThumbnail(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateMainImage(images[currentImageIndex]);
    updateThumbnail(currentImageIndex);
}

// Zoom button click
zoomBtn.addEventListener('click', openLightbox);

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Variant selection
function updateVariant(variantId) {
    productData.currentVariant = variantId;
    const variant = productData.variants[variantId];
    
    // Update variant buttons
    variantBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.variant === variantId);
    });
    
    // Update prices
    priceAmount.textContent = `Rp ${variant.price.toLocaleString()}`;
    priceCrossed.textContent = `Rp ${variant.originalPrice.toLocaleString()}`;
    
    // Update total
    updateTotal();
    
    // Update modal info
    updateModalInfo();
}

variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        updateVariant(btn.dataset.variant);
    });
});

// Quantity controls
function updateQuantity(newQty) {
    const qty = Math.max(1, Math.min(10, newQty));
    quantityInput.value = qty;
    updateTotal();
    updateModalInfo();
}

decreaseQty.addEventListener('click', () => {
    updateQuantity(parseInt(quantityInput.value) - 1);
});

increaseQty.addEventListener('click', () => {
    updateQuantity(parseInt(quantityInput.value) + 1);
});

quantityInput.addEventListener('change', () => {
    updateQuantity(parseInt(quantityInput.value));
});

function updateTotal() {
    const variant = productData.variants[productData.currentVariant];
    const quantity = parseInt(quantityInput.value);
    const total = variant.price * quantity;
    totalAmount.textContent = `Rp ${total.toLocaleString()}`;
}

function updateModalInfo() {
    const variant = productData.variants[productData.currentVariant];
    const quantity = parseInt(quantityInput.value);
    const total = variant.price * quantity;
    
    modalQty.textContent = quantity;
    modalTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Modal functionality
function openModal() {
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateModalInfo();
}

function closeModal() {
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

orderBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

// Close modal on background click
orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeModal();
    }
});

// Contact button
contactBtn.addEventListener('click', () => {
    window.open('https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk Makanan Tradisional Desa', '_blank');
});

// Mobile navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Generate QR Code
function generateQRCode() {
    const qrData = {
        product: productData.name,
        variant: productData.variants[productData.currentVariant].name,
        price: productData.variants[productData.currentVariant].price,
        url: window.location.href
    };
    
    const qrText = JSON.stringify(qrData);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
    
    // Create QR code image
    const qrImg = document.createElement('img');
    qrImg.src = qrUrl;
    qrImg.alt = 'QR Code';
    qrImg.style.width = '100%';
    qrImg.style.height = '100%';
    qrImg.style.objectFit = 'contain';
    
    // Clear existing content and add QR code
    qrCode.innerHTML = '';
    qrCode.appendChild(qrImg);
}

// Form validation and submission
function validateForm() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if (!name) {
        alert('Mohon masukkan nama lengkap');
        return false;
    }
    
    if (!phone) {
        alert('Mohon masukkan nomor telepon');
        return false;
    }
    
    if (!address) {
        alert('Mohon masukkan alamat pengiriman');
        return false;
    }
    
    return true;
}

function submitOrder() {
    if (!validateForm()) {
        return;
    }
    
    const formData = {
        product: productData.name,
        variant: productData.variants[productData.currentVariant].name,
        quantity: quantityInput.value,
        total: totalAmount.textContent,
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value,
            notes: document.getElementById('orderNotes').value
        }
    };
    
    // Simulate order submission
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage();
        closeModal();
    }, 2000);
}

function showLoadingState() {
    const confirmBtn = document.getElementById('modalConfirm');
    confirmBtn.textContent = 'Memproses...';
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.7';
}

function hideLoadingState() {
    const confirmBtn = document.getElementById('modalConfirm');
    confirmBtn.textContent = 'Konfirmasi Pesanan';
    confirmBtn.disabled = false;
    confirmBtn.style.opacity = '1';
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            text-align: center;
            z-index: 3000;
        ">
            <i class="fas fa-check-circle" style="color: #22a32a; font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3 style="color: #133E87; margin-bottom: 1rem;">Pesanan Berhasil!</h3>
            <p style="color: #6c757d; margin-bottom: 1.5rem;">Pesanan Anda telah diterima dan akan segera diproses.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #22a32a;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">OK</button>
        </div>
    `;
    document.body.appendChild(successDiv);
}

modalConfirm.addEventListener('click', submitOrder);

// Smooth scrolling for anchor links
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

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Generate QR code
    generateQRCode();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add scroll animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-info, .aside-panel');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGM0YwIi8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDMwIDEwMEMxMzAgMTE2LjU2OSAxMTYuNTY5IDEzMCAxMDAgMTMwQzgzLjQzMSAxMzAgNzAgMTE2LjU2OSA3MCAxMEM3MCA4My40MzEgODMuNDMxIDcwIDEwMCA3MFoiIGZpbGw9IiM2MDhCQzEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIyLjA5MDkgMjAgMjQgMTguMDkwOSAyNCAxNkMyNCAxMy45MDkxIDIyLjA5MDkgMTIgMjAgMTJDMTcuOTA5MSAxMiAxNiAxMy45MDkxIDE2IDE2QzE2IDE4LjA5MDkgMTcuOTA5MSAyMCAyMCAyMFoiIGZpbGw9IiMxMzNFODciLz4KPC9zdmc+Cjwvc3ZnPgo=';
        this.alt = 'Gambar tidak tersedia';
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.variant-btn, .qty-btn, .btn-primary, .btn-secondary').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add keyboard navigation for quantity
quantityInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateQuantity(parseInt(quantityInput.value) + 1);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateQuantity(parseInt(quantityInput.value) - 1);
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }
}
