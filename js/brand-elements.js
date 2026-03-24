// ==========================================
// RIVAAJE' — Brand Logo
// Hero: Separate Lotus + Infinity (pop effect, touching)
// Navbar/Sections: Combined single logo
// ==========================================

const svgGradientDef = `
<svg width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7a4838"/>
      <stop offset="20%" style="stop-color:#8a5848"/>
      <stop offset="40%" style="stop-color:#9a6858"/>
      <stop offset="60%" style="stop-color:#8a5848"/>
      <stop offset="80%" style="stop-color:#9a6858"/>
      <stop offset="100%" style="stop-color:#7a4838"/>
    </linearGradient>
    <linearGradient id="roseGoldBright" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7a4838"/>
      <stop offset="25%" style="stop-color:#9a6858"/>
      <stop offset="50%" style="stop-color:#8a5848"/>
      <stop offset="75%" style="stop-color:#9a6858"/>
      <stop offset="100%" style="stop-color:#7a4838"/>
    </linearGradient>
    <filter id="glowEffect">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`;

// === SEPARATE Lotus SVG (for hero — pop effect) ===
function lotusSVG(width = 55, height = 45) {
  return `<svg viewBox="0 0 100 75" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 C50 5, 40 22, 40 38 C40 48, 44 54, 50 56 C56 54, 60 48, 60 38 C60 22, 50 5, 50 5Z" fill="url(#roseGoldGrad)"/>
    <path d="M50 56 C46 50, 30 42, 24 32 C20 26, 22 22, 26 22 C30 22, 42 36, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.85"/>
    <path d="M50 56 C54 50, 70 42, 76 32 C80 26, 78 22, 74 22 C70 22, 58 36, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.85"/>
    <path d="M50 56 C42 48, 22 44, 16 35 C12 28, 15 24, 19 25 C24 27, 38 42, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.6"/>
    <path d="M50 56 C58 48, 78 44, 84 35 C88 28, 85 24, 81 25 C76 27, 62 42, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.6"/>
    <path d="M38 56 C40 60, 44 62, 50 62 C56 62, 60 60, 62 56 C60 58, 55 60, 50 60 C45 60, 40 58, 38 56Z" fill="url(#roseGoldGrad)" opacity="0.65"/>
  </svg>`;
}

// === SEPARATE Infinity SVG (for hero — pop effect with glow) ===
function infinitySVG(width = 48, height = 24) {
  return `<svg viewBox="0 0 120 55" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 27.5 C60 27.5, 38 5, 20 5 C8 5, 2 15, 2 27.5 C2 40, 8 50, 20 50 C38 50, 60 27.5, 60 27.5 C60 27.5, 82 5, 100 5 C112 5, 118 15, 118 27.5 C118 40, 112 50, 100 50 C82 50, 60 27.5, 60 27.5Z"
      fill="none" stroke="url(#roseGoldBright)" stroke-width="4" stroke-linecap="round" opacity="0.25" filter="url(#glowEffect)"/>
    <path d="M60 27.5 C60 27.5, 38 5, 20 5 C8 5, 2 15, 2 27.5 C2 40, 8 50, 20 50 C38 50, 60 27.5, 60 27.5 C60 27.5, 82 5, 100 5 C112 5, 118 15, 118 27.5 C118 40, 112 50, 100 50 C82 50, 60 27.5, 60 27.5Z"
      fill="none" stroke="url(#roseGoldBright)" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

// === COMBINED Logo (for navbar + sections) ===
function logoSVG(width = 55, height = 55) {
  return `<svg viewBox="0 0 100 95" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- LOTUS -->
    <path d="M50 5 C50 5, 40 22, 40 38 C40 48, 44 54, 50 56 C56 54, 60 48, 60 38 C60 22, 50 5, 50 5Z" fill="url(#roseGoldGrad)"/>
    <path d="M50 56 C46 50, 30 42, 24 32 C20 26, 22 22, 26 22 C30 22, 42 36, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.85"/>
    <path d="M50 56 C54 50, 70 42, 76 32 C80 26, 78 22, 74 22 C70 22, 58 36, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.85"/>
    <path d="M50 56 C42 48, 22 44, 16 35 C12 28, 15 24, 19 25 C24 27, 38 42, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.6"/>
    <path d="M50 56 C58 48, 78 44, 84 35 C88 28, 85 24, 81 25 C76 27, 62 42, 50 56Z" fill="url(#roseGoldGrad)" opacity="0.6"/>
    <path d="M38 56 C40 60, 44 62, 50 62 C56 62, 60 60, 62 56 C60 58, 55 60, 50 60 C45 60, 40 58, 38 56Z" fill="url(#roseGoldGrad)" opacity="0.65"/>
    <!-- INFINITY (touching lotus) -->
    <path d="M50 68 C50 68, 35 55, 24 55 C16 55, 12 61, 12 68 C12 75, 16 81, 24 81 C35 81, 50 68, 50 68 C50 68, 65 55, 76 55 C84 55, 88 61, 88 68 C88 75, 84 81, 76 81 C65 81, 50 68, 50 68Z"
      fill="none" stroke="url(#roseGoldBright)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

// Insert gradient definition
document.body.insertAdjacentHTML('afterbegin', svgGradientDef);

// === HERO — Separate lotus + infinity (pop pop effect, touching) ===
document.querySelectorAll('.hero-lotus').forEach(el => {
  el.innerHTML = lotusSVG(60, 48);
  el.style.display = 'block';
});
document.querySelectorAll('.hero-infinity').forEach(el => {
  el.innerHTML = infinitySVG(50, 25);
  el.style.display = 'block';
});

// === NAVBAR — Combined single logo ===
document.querySelectorAll('.mini-lotus').forEach(el => {
  el.innerHTML = logoSVG(28, 28);
});
document.querySelectorAll('.mini-infinity').forEach(el => {
  el.style.display = 'none';
});

// === SECTIONS — Combined single logo ===
document.querySelectorAll('.sec-lotus').forEach(el => {
  el.innerHTML = logoSVG(40, 40);
});
document.querySelectorAll('.sec-infinity').forEach(el => {
  el.style.display = 'none';
});
