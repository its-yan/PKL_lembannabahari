# Repository Overview

This project hosts the static website for **Desa Wisata Andalan Lembanna**, delivering informational pages about village services, facilities, and tourism. The site is primarily HTML-driven with supporting CSS and JavaScript assets for layout, interactivity, and responsive behaviour.

## Tech Stack
- **HTML5** for static pages.
- **CSS** (primarily under `asset2/css` and `asset/css`) for styling, responsive layouts, and animations.
- **JavaScript** files across `asset2/js` and `asset/js` for UI interactions (sticky nav, smooth scrolling, card animations, etc.).
- No build tooling or package management is present—open the HTML files directly in a browser.

## Key Directories
- `asset2/css/` – Main styling for the landing/home experience and shared components.
- `asset2/js/` – Primary scripts for the modern landing experience (`script.js`, `informasi.js`).
- `asset/css/` & `asset/js/` – Legacy/auxiliary styles and scripts used on other pages (profil, wisata, etc.).
- `asset3/` – Alternate asset set (CSS/JS/IMG) tailored for specific sections or redesigned pages.
- `IMG/` – Additional imagery referenced by certain pages.

## Notable Files
- `index.html` – Landing page with dynamic hero effects and smooth navigation.
- `Layanan.html`, `wisata.html`, `informasi.html`, etc. – Section-specific content pages.
- `asset2/js/script.js` – Core interactive logic: scroll animations, sticky nav, floating cards, smooth scrolling, scroll-to-top button, mobile menu handling.
- `asset2/js/informasi.js` – Enhancements for the informasi page (accordion, filtering, etc.).
- `styles.css`, `asset2/css/styles.css` – Baseline styling sheets referenced across pages.

## Working Guidelines
1. **Use absolute paths** rooted at `c:\Users\Samael\Documents\GitHub\PKL_lembannabahari` for any tooling or edits.
2. **Prioritize readability**: prefer descriptive class names, comments for complex selectors, and concise JavaScript.
3. **Responsive design** is important—verify changes around breakpoints (notably `max-width: 768px` and `900px`).
4. **Avoid unnecessary refactors** unless explicitly requested; keep changes scoped to the reported issue.
5. Since there is no build step, **test by opening the HTML files** directly in a browser after modifications.

## Common Tasks
- Adjust styling by editing the relevant CSS file (often `asset2/css/styles.css`).
- Update interactive behaviours via `asset2/js/script.js` or page-specific JS files.
- Add new assets (images, icons) by placing them in the appropriate `asset` directory and referencing them with relative paths from pages.

## Testing & Verification
- Manual testing in the browser is required; ensure navigation, animations, and responsive layouts behave as expected on both desktop (>900px) and mobile (<768px) widths.
- When updating JavaScript, confirm there are no console errors and interactions remain accessible (ARIA attributes, keyboard navigation, etc.).