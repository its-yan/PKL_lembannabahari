---
description: Repository Information Overview
alwaysApply: true
---

# Desa Lembanna Website Information

## Summary
A static website for Desa Lembanna in Bulukumba, Sulawesi Selatan, showcasing the village's tourist attractions, facilities, and information. The website features multiple pages including tourism spots, village profile, services, and UMKM (local businesses).

## Structure
- **asset/**: Main assets directory containing CSS, JS, and images for the primary website components
- **asset2/**: Secondary assets directory with additional styles and images
- **asset3/**: Tertiary assets directory with specific components for facilities and services
- **HTML Files**: Multiple HTML files representing different pages of the website

## Language & Runtime
**Language**: HTML, CSS, JavaScript
**Version**: HTML5, CSS3, ES6+
**Build System**: None (Static website)
**Package Manager**: None

## Main Components

### Frontend Structure
**Main Pages**:
- `index.html`: Homepage with hero section and main navigation
- `wisata.html`: Tourism attractions page
- `profil.html`: Village profile information
- `Layanan.html`: Services offered in the village
- `informasi.html`: General information about the village
- `umkm_menu.html` & `umkm_snack.html`: Local business pages

### CSS Organization
**Main Stylesheets**:
- `asset/css/index.css`: Core styling for the website
- `asset/css/wisata.css`: Styles for tourism attractions
- `asset/css/wisata-responsive.css` & `asset/css/profil-responsive.css`: Responsive design styles
- `asset/css/enhanced_image_rotation.css`: Enhanced image animations

### JavaScript Functionality
**Core Scripts**:
- `asset/js/global.js`: Global utility functions
- `asset/js/index.js`: Main page functionality
- `asset/js/wisata-objek.js`: Tourism objects handling
- `asset/js/atraksi.js`: Tourism attractions functionality
- `asset/js/akomodasi.js`: Accommodation information
- `asset/js/kuliner.js`: Culinary attractions
- `asset/js/sewa.js`: Rental services

## Features
**Tourism Showcase**:
- Interactive cards for tourism objects
- Image rotation with enhanced animations
- Filtering and search functionality for attractions

**Responsive Design**:
- Mobile-friendly layout
- Responsive navigation
- Adaptive content display

**Interactive Elements**:
- Lightbox for image viewing with zoom functionality
- Carousel sliders for content
- Search and filtering capabilities

## Recent Improvements
**Image Handling**:
- Enhanced image rotation animations
- Preloading images to prevent jittering
- Fixed dimensions to prevent layout shifts

**Lightbox Functionality**:
- Added zoom functionality
- Improved button positioning
- Enhanced keyboard navigation
- Touch support for mobile devices

## Integration Points
The website uses vanilla JavaScript without external frameworks. Integration between components is handled through custom JavaScript modules that are loaded on specific pages.

## Development Approach
The website follows a modular approach with separate JavaScript files for different functionalities. CSS is organized by page/component with dedicated responsive design files.