// Simple lightbox gallery
const images = Array.from(document.querySelectorAll('.gallery-thumbs img'));
let currentIndex = 0;
function openLightbox(src) {
    const lightbox = document.getElementById('galleryLightbox');
    const content = lightbox.querySelector('.gallery-lightbox-content');
    currentIndex = images.findIndex(img => img.src === src);
    content.innerHTML = `<img src='${src}' style='max-width:100%;border-radius:12px;' />`;
    lightbox.style.display = 'block';
}
function closeLightbox() {
    document.getElementById('galleryLightbox').style.display = 'none';
}
function prevLightbox() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(images[currentIndex].src);
}
function nextLightbox() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(images[currentIndex].src);
}
