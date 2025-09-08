const galleryImageMap = {
	'fasilitas_kamar-mandi.html': [
		'IMG/Kamar mandi umum terbaik di Mandala Ria Beach.jpg',
	],
	'fasilitas_pusat-informasi.html': [
		'IMG/Pusat_info/Pusat_informasi.jpeg',
	],
	'fasilitas_pusat-informasi-2.html': [
		'IMG/Pusat_info/Pusat_informasi_2.jpeg',
	],
	'fasilitas_taman-camping.html': [
		'IMG/Camping_ground/Camping Ground-1.jpeg',
		'IMG/Camping_ground/Camping Ground-2.jpeg',
		'IMG/Camping_ground/Camping Ground-3.jpeg',
		'IMG/Camping_ground/Camping Ground-4.jpeg',
		'IMG/Camping_ground/Camping Ground-5.jpeg',
		'IMG/Camping_ground/Camping Ground-6.jpeg',
	],
	'fasilitas_tempat-ibadah.html': [
		'IMG/Musollah/Masjid.jpeg',
        'IMG/Musollah/Masjid_1.jpeg',
	],
	'fasilitas_tempat-ibadah-2.html': [
		'IMG/Musollah/Musolah_villa.jpeg',
        'IMG/Musollah/Musolah_villa_2.jpeg',
	],
};

// Get current HTML filename
function getCurrentHtmlFile() {
	const path = window.location.pathname;
	return path.substring(path.lastIndexOf('/') + 1);
}

const galleryImages = galleryImageMap[getCurrentHtmlFile()] || [
	'IMG/WhatsApp Image 2025-08-20 at 3.35.03 PM.jpeg',
];

function createSlideshow() {
	const gallery = document.querySelector('.gallery');
	if (!gallery) return;
	gallery.innerHTML = `
		<div class="slideshow-container">
			<button class="slide-btn left" aria-label="Previous"><span>&#10094;</span></button>
			<div class="slide-wrapper">
				<img class="slide-img" src="${galleryImages[0]}" alt="Galeri Desa" tabindex="0" />
			</div>
			<button class="slide-btn right" aria-label="Next"><span>&#10095;</span></button>
			<div class="slide-dots">
				${galleryImages.map((_,i)=>`<span class="dot${i===0?' active':''}" data-index="${i}"></span>`).join('')}
			</div>
			<div class="zoom-overlay">
				<img class="zoom-img" src="" alt="Zoomed" />
				<span class="close-zoom">&times;</span>
			</div>
		</div>
	`;

	let current = 0;
	const img = gallery.querySelector('.slide-img');
	const leftBtn = gallery.querySelector('.slide-btn.left');
	const rightBtn = gallery.querySelector('.slide-btn.right');
	const dots = gallery.querySelectorAll('.dot');
	const overlay = gallery.querySelector('.zoom-overlay');
	const zoomImg = gallery.querySelector('.zoom-img');
	const closeZoom = gallery.querySelector('.close-zoom');

	function showSlide(idx) {
		current = (idx + galleryImages.length) % galleryImages.length;
		img.src = galleryImages[current];
		dots.forEach((d,i)=>d.classList.toggle('active',i===current));
	}

	leftBtn.onclick = () => showSlide(current-1);
	rightBtn.onclick = () => showSlide(current+1);
	dots.forEach((d,i)=>d.onclick=()=>showSlide(i));

	// Zoom functionality
	img.onclick = () => {
		overlay.classList.add('active');
		zoomImg.src = galleryImages[current];
	};
	closeZoom.onclick = () => overlay.classList.remove('active');
	overlay.onclick = e => { if(e.target===overlay) overlay.classList.remove('active'); };
	// Keyboard navigation
	document.addEventListener('keydown', e => {
		if(document.activeElement === img || overlay.classList.contains('active')) {
			if(e.key==='ArrowLeft') showSlide(current-1);
			if(e.key==='ArrowRight') showSlide(current+1);
			if(e.key==='Escape') overlay.classList.remove('active');
		}
	});
}

document.addEventListener('DOMContentLoaded', createSlideshow);
